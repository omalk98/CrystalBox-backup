from RPi.GPIO import setwarnings, cleanup

class Mode: 
    """Base class for setup and cleanup for all modes"""

    def __init__(self):
        setwarnings(False)
    
    def __del__(self):
        cleanup()
