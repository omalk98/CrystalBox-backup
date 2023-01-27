from RPi.GPIO import setwarnings, cleanup

class Setup: 
    """Base class for setup and cleanup"""

    def __init__(self):
        setwarnings(False)
    
    def __del__(self):
        cleanup()
