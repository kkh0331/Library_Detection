import base64
import io
from PIL import Image

def stringToRGB(base64_string):
    imgdata = base64.b64decode(base64_string)
    dataBytesIO = io.BytesIO(imgdata)
    image = Image.open(dataBytesIO)
    # image.show()
    # resized_image = image.resize((1104, 1080))
    return image