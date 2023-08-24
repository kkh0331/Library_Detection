# Library_Detection
- 2023년 1학기 경희대학교 산업경영공학과 '창의적종합설계1'에서 만든 졸업프로젝트

# 컴퓨터 비전 기반 공과대학 열람실 예약 시스템 개선
- 목적 : 현 공과대학 열람실에서 빈번하게 일어난 사석화 & 공석 문제를 해결하기 위해
- Custom YOLOv5 model 이용
- Main Page Capture Image<br>
<img width="443" alt="스크린샷 2023-07-23 오후 6 13 47" src="https://github.com/kkh0331/Library_Detection/assets/99806443/3e2b1503-3265-4009-87f2-54dce86ed426"><br>
[시연영상을 보실려면 여기를 클릭해주세요](https://youtu.be/Vsal5Zp8qE0)
- 업데이트된 코드(멀티로 구현되게 제작되었음)는 위 영상과 다름
- 영상 및 모델은 용량제한으로 인하여 업로드하지 않았음

# 프로젝트 진행한 순서
1. 프로젝트 기획
2. 훈련데이터 수집을 위해 영상 촬영
3. data-analysis > video_to_image.ipynb을 활용해 영상을 이미지 데이터로 변환
4. labelImg.py을 활용해 변환된 이미지 데이터 라벨링 작업 진행
5. data-analysis > Custom_Yolov5_training.ipynb을 활용해 모델 학습
6. 개선된 공과대학 열람실 예약 시스템 서비스 개발

# Functions
- 예약 및 반납 기능
- 사석화 및 공석 탐지 후 자동 반납 기능
  - front-end에서 5초마다 back-end로 이미지 전송
  - back-end에서 받아온 이미지로 자체 구축한 YOLOv5 모델 돌림
  - 위의 결과값과 고정으로 넣은 좌석 좌표를 가지고 좌석 상태 정의
  - 정의된 좌석 상태를 DB에 저장함
  - 미리 설정한 count 이상 쌓이면 자동 반납 기능 수행

# 프로젝트 Architecture
<img width="402" alt="스크린샷 2023-07-23 오후 6 18 17" src="https://github.com/kkh0331/Library_Detection/assets/99806443/8c66314e-da8c-4e78-bcf2-139df0f28485"><br>
IP카메라의 영상을 서버에서 프레임 단위로 받아 자체 구축한 YOLOv5 모델로 분석 후 좌석 상태를 정의하여 그 결과값을 DB에 쌓아 상황에 따라 알맞은 처리를 진행합니다.
