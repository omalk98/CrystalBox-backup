from os import getenv
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

BUZZER_PIN = getenv("BUZZER_PIN")

LED_PINS = [getenv("RED_PIN"), getenv("GREEN_PIN"), getenv("BLUE_PIN")]

GATEWAY_ID = getenv("GATEWAY_ID")

BASE_URL = getenv("BASE_URL")
