import psutil
from datetime import datetime

ram_history = []
swap_history = []
time_labels = []
MAX_ENTRIES = 20  # keep only last 20 measurements


def sample_memory():
    ram = psutil.virtual_memory().percent
    swap = psutil.swap_memory().percent
    now = datetime.now().strftime("%H:%M:%S")  # '14:35:22'

    ram_history.append(ram)
    swap_history.append(swap)
    time_labels.append(now)

    # Keep only the latest N entries
    if len(ram_history) > MAX_ENTRIES:
        ram_history.pop(0)
        swap_history.pop(0)
        time_labels.pop(0)


def get_memory_history():
    sample_memory()
    return {
        "ramHistory": ram_history,
        "swapHistory": swap_history,
        "timeLabels": time_labels,
    }
