tofish = []
rate = 1.25

def findMaxPV(fishpop, yearsleft):
    # if end of time, return 0
    if yearsleft == 0:
        return 0
    else:
        # return max PV of tofish and not to fish
        # fish
        caught = 0.7 * fishpop
        value1 = caught + findMaxPV(fishpop, yearsleft - 1) / rate
        value2 = findMaxPV(fishpop * 2, yearsleft - 1) / rate
        if(value1 > value2):
            tofish[yearsleft] = True
            return value1
        else:
            tofish[yearsleft] = False
            return value2
