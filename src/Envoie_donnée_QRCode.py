import serial
import time
import sys

from nava import play, stop

productName = sys.argv[1]
Reference = sys.argv[2]
quantiteQR = int(sys.argv[3])

data=" Produit : " + productName + " Reference : "+ Reference

# Ouvrir la connexion série avec l'Arduino
serial_port = serial.Serial('/dev/ttyAMA0', 9600)  #port série
time.sleep(3)  # Attendez que la connexion soit établie

# Envoyer des données à l'Arduino
serial_port.write(str(quantiteQR).encode())  # Envoyer la quantité d'itérations
serial_port.write(data.encode())  # Envoyer les autres données

sound_id = play("src/Validation.wav", async_mode=True)
time.sleep(4)
stop(sound_id)