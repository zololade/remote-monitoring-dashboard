"""imports"""

import json
import psutil


def name():
    """username"""
    users = psutil.users()
    current_user = users[0].name if users else "Unknown"
    return current_user


def get_battery_info():
    """battery"""
    battery = psutil.sensors_battery()
    if battery is None:
        return "Battery info not available."
    return {
        "percent": f"{battery.percent}%",
        "plugged_in": battery.power_plugged,
        "time_left": (
            battery.secsleft
            if battery.secsleft != psutil.POWER_TIME_UNLIMITED
            else "Unlimited"
        ),
    }


def get_memory_info():
    """memory"""
    virtual = psutil.virtual_memory()
    swap = psutil.swap_memory()
    return {
        "RAM": {
            "total": virtual.total,
            "used": virtual.used,
            "percent": virtual.percent,
        },
        "Swap": {"total": swap.total, "used": swap.used, "percent": swap.percent},
    }


def get_disk_info():
    """disk"""
    usage = psutil.disk_usage("/")
    return {
        "total": usage.total,
        "used": usage.used,
        "free": usage.free,
        "percent": usage.percent,
    }


def main():
    """return value for fetched data"""
    battery = get_battery_info()
    memory = get_memory_info()
    disk = get_disk_info()
    user = name()

    return json.dumps(
        {"battery": battery, "memory": memory, "disk": disk, "user": user}
    )


main()
