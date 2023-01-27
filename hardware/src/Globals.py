from os import getenv
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

BUZZER_PIN: int = int(getenv("BUZZER_PIN"))
"""The pin number for the buzzer"""

LED_PINS: list = [int(getenv("RED_PIN")), int(getenv("GREEN_PIN")), int(getenv("BLUE_PIN"))]
"""List of pin numbers for the LED"""

GATEWAY_ID: str = getenv("GATEWAY_ID")
"""The Gateway ID for the device"""

BASE_URL: str = getenv("BASE_URL")
"""The base URL for the API"""
