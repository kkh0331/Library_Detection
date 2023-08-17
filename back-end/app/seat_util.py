import yolov5
from django.conf import settings
import os

yolo_weightsdir = settings.YOLOV5_WEIGTHS_DIR
model = yolov5.load(os.path.join(yolo_weightsdir, 'best.pt'))

# 좌석 bbox 저장(순서대로 지정) -(cloth 탐지 안됨 7번좌석)
# seat_bbox = [[1.53400e+02, 3.89327e+02, 2.67870e+02, 4.98872e+02],
#              [2.62981e+02, 3.98840e+02, 3.76151e+02, 4.86027e+02],
#              [3.69372e+02, 4.05868e+02, 4.77888e+02, 4.83721e+02],
#              [5.71221e+02, 3.96502e+02, 6.74413e+02, 4.93971e+02],
#              [6.69845e+02, 4.02149e+02, 7.74995e+02, 4.85139e+02],
#              [7.75539e+02, 3.99870e+02, 8.83480e+02, 4.89714e+02],
#              [0.00000e+00, 4.97598e+02, 1.06412e+02, 7.15886e+02],
#              [1.08951e+02, 4.98115e+02, 2.85020e+02, 7.04519e+02],
#              [2.98685e+02, 5.03596e+02, 4.56541e+02, 7.18624e+02],
#              [6.28295e+02, 4.98507e+02, 7.82224e+02, 7.19146e+02],
#              [7.98725e+02, 5.04688e+02, 9.60054e+02, 7.05412e+02],
#              [9.56734e+02, 5.02194e+02, 1.10400e+03, 7.07798e+02]]

seat_bbox_back = [[170.00016, 139.00005000000002, 257.00016, 236.99979000000002],
 [256.99968, 143.00009999999997, 339.99936, 238.00014],
 [336.99984, 148.00023, 423.99983999999995, 247.00005],
 [497.00015999999994, 160.00011, 578.00016, 258.99993],
 [582.00048, 165.99978, 656.00016, 262.99998000000005],
 [655.00032, 173.00007, 726.0, 271.99989],
 [0.9998400000000007, 265.99995, 98.99951999999999, 471.99969],
 [99.99984, 265.99968, 245.99952000000002, 469.9998],
 [249.00000000000003, 274.00005, 409.99968, 486.00027],
 [543.0, 295.99992000000003, 688.00032, 484.99992],
 [687.99984, 302.99967000000004, 812.00016, 486.99981],
 [813.00048, 311.99985000000004, 918.00048, 484.00011]]

seat_bbox_front = [[824.9995200000001, 336.99969000000004, 929.9995200000001, 520.99983],
 [704.0001599999999, 333.99972, 825.9998400000001, 523.9998],
 [563.00016, 328.00032, 702.9998400000001, 528.00012],
 [271.00032000000004, 317.00025, 428.00064000000003, 526.00023],
 [120.0, 306.99999, 271.00032, 531.00009],
 [0.9998400000000007, 306.99998999999997, 119.00016, 526.99977],
 [664.99968, 208.99998, 736.9996799999999, 314.99982],
 [591.00048, 200.00007, 665.00016, 311.99985000000004],
 [512.00016, 196.00001999999998, 588.00048, 306.00018],
 [356.00016000000005, 185.99975999999998, 438.00048, 294.99984],
 [275.00016, 179.00001, 354.99984, 292.99995],
 [191.00064, 177.99966, 274.00032, 288.9999]]


def seat_detection(img_rgb, direction):

    seat_bbox = seat_bbox_back if direction == 'back' else seat_bbox_front

    pred = model(img_rgb)

    person_bbox = []
    obj_bbox = []

    # print(pred.pandas().xyxy[0])
    # pred.show()

    # 탐지된 객체의 bounding box 좌표 가져오기
    boxes = pred.xyxy[0][:, :].cpu()
    classes = pred.xyxy[0][:, -1]

    for i in range(len(boxes)):
        if boxes[i][5] == 0:
            person_bbox.append(boxes[i][:4])
        else:
            obj_bbox.append(boxes[i][:4])

    seat_status = {}

    # seat와 겹치는 영역과 물체의 영역 계산
    for i in range(len(seat_bbox)):

        seat_index = i+1 if i <= 5 else i+7
        if direction == 'back':
            seat_index += 6

        # seat_status[i + 1] = 'EMPTY'
        seat_status[seat_index] = 'EMPTY'

        for j in range(len(person_bbox)):
            # 사람과 seat 겹치는 영역
            intersection_person_area = max(0, min(person_bbox[j][2], seat_bbox[i][2]) - max(person_bbox[j][0],
                                                                                            seat_bbox[i][0])) * \
                                       max(0, min(person_bbox[j][3], seat_bbox[i][3]) - max(person_bbox[j][1],
                                                                                            seat_bbox[i][1]))
            # 사람 bbox 영역
            box_person_area = (person_bbox[j][2] - person_bbox[j][0]) * (person_bbox[j][3] - person_bbox[j][1])
            # 값 확인
            # print('seat', i+1, 'person', j, 'intersection_person_area: ', intersection_person_area , 'box_person_area: ', box_person_area)

            # 겹치는 영역/탐지 bbox 영역 비율로 seat 상태 정의
            # 사람은 많이 겹치기 때문에 높여도 될 것 같긴 함
            if (intersection_person_area / box_person_area >= 0.5):
                # seat_status[i + 1] = 'USE'
                seat_status[seat_index] = 'USE'
                break

        for k in range(len(obj_bbox)):
            # if seat_status[i + 1] == 'USE':
            if seat_status[seat_index] == 'USE':
                break
            # 짐과 seat 겹치는 영역
            intersection_obj_area = max(0,
                                        min(obj_bbox[k][2], seat_bbox[i][2]) - max(obj_bbox[k][0], seat_bbox[i][0])) * \
                                    max(0, min(obj_bbox[k][3], seat_bbox[i][3]) - max(obj_bbox[k][1], seat_bbox[i][1]))
            # 짐 bbox 영역
            box_obj_area = (obj_bbox[k][2] - obj_bbox[k][0]) * (obj_bbox[k][3] - obj_bbox[k][1])

            # 값 확인
            # print('seat', i+1,'obj', k, 'intersection:', intersection_obj_area, 'box_obj_area:', box_obj_area, 'intersection_obj_area / box_obj_area: ', intersection_obj_area / box_obj_area)

            # 겹치는 영역/탐지 bbox 영역 비율로 seat 상태 정의
            # 아이패드가 작아서 짐 thredhold 0.1 설정
            if (intersection_obj_area / box_obj_area >= 0.1):
                # seat_status[i + 1] = 'PRIVATE'
                seat_status[seat_index] = 'PRIVATE'
                break

    return seat_status


