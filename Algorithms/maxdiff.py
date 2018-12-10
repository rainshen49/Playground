# the classical problem of find the best time to buy and sell stock on a time series

# assume: at least 2 elememts in the arr
# return zero if not possible


def maxDiff(arr):
    assert len(arr) > 1
    # current best difference and their indexes
    currMin = arr[0]
    icurrMin = 0
    currDiff = arr[1]-currMin
    icurrDiff = 1
    # candidate minimum and their indexes
    candMin = currMin
    icandMin = icurrMin
    for i in range(1, len(arr)):
        # take new minimum as a candidate
        if arr[i] < candMin:
            candMin = arr[i]
            icandMin = i
        # promote candidate if a higher difference is found
        if arr[i] - candMin > currDiff:
            currMin = candMin
            icurrMin = icandMin
            currDiff = arr[i] - candMin
            icurrDiff = i
    return icurrMin, icurrDiff, currDiff


print(maxDiff([2, 3, 10, 6, 4, 8, 1]))
print(maxDiff([7, 9, 5, 6, 3, 20]))
print(maxDiff(sorted([7, 9, 5, 6, 3, 20],reverse=True)))
