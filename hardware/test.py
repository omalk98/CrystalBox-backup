from time import sleep
from mfrc522 import SimpleMFRC522
from gpiozero import TonalBuzzer, RGBLED
from gpiozero.tones import Tone
from colorzero import Color

bz=TonalBuzzer(4)
led=RGBLED(27, 22, 17)

reader = SimpleMFRC522()
try :
    while True :
        led.color = Color('green')
        
        print("place card now: ")
        id, text = reader.read()
        print(id)
        print(text)
        in_data = id
        if (in_data == 902215703777) :
            led.color = Color('green')
            bz.play(Tone(880.0))
            sleep(0.05)
            led.off()
            bz.stop()
            sleep(0.05)
            led.color = Color('green')
            bz.play(Tone(880.0))
            sleep(0.1)
        elif (in_data == "r"):
            led.color = Color('blue')
            bz.play(Tone(880.0))
            sleep(0.23)
            bz.play(Tone(220.0))
            sleep(0.6)
        elif (in_data == "x"):
            break
        else :
            led.color = Color('red')
            bz.play(Tone(220.0))
            sleep(0.2)
            bz.stop()
            led.off()
            sleep(0.01)
            led.color = Color('red')
            bz.play(Tone(220.0))
            sleep(0.2)

        
        bz.stop()
        print("processing...")
        led.color = Color('red')
        sleep(2)
        led.off()
except KeyboardInterrupt:
    pass
