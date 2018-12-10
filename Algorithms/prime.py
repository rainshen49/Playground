from math import log, ceil


def answer(n):
    # your code here
    # determine how many prime numbers to generate
    toGenerate = generateHowMany(n)
    # generate them
    seq = generatePrime(toGenerate)
    # print('generated', len(seq))
    # generate the string (in a production minion system, this should be cached)
    code = ''.join([str(i) for i in seq])
    return code[n:n+5]


# the first few prime numbers are directly cached here
primesCache = [2, 3, 5, 7, 11, 13, 17, 19,
               23, 29, 31, 37, 41, 43, 47, 53, 59, 61]


def generateHowMany(i):
    '''to arrive at the (i+5)th index in the string, how many prime numbers we need to generate?'''
    # this is really just an observation within 10000 indexes
    return i/2+5


def generatePrime(n):
    '''generate a sequence of a little bit more than n prime numbers'''
    # we need an upper bound to use the Eratosthenes theorem
    upper = int(findUpperBound(n))
    # print("no bigger than", upper)
    flags = [True for i in range(0, upper+1)]
    # 0 and 1 are not primes
    flags[0] = False
    flags[1] = False
    for prime in primesCache:
        markMultipleAsComposite(flags, prime, upper)
    for i in range(primesCache[-1], upper):
        if flags[i]:
            markMultipleAsComposite(flags, i, upper)
    # the indexes of True are prime numbers
    return [i for i in range(2, upper+1) if flags[i]]


def markMultipleAsComposite(flags, num, bound):
    '''use Eratosthenes to flag non-primes'''
    index = num + num
    while index <= bound:
        flags[index] = False
        index += num


def findUpperBound(n):
    '''find an an upper bound for the nth prime
    always give the cache if below the limit'''
    if n < 13:
        return primesCache[-1]
    else:
        # use approximation theorem by Massias and Robin
        return n*ceil(log(n) + log(log(n)))


print(answer(0))
print(answer(10))
print(answer(50))
print(answer(100))
print(answer(500))
print(answer(1000))
print(answer(5000))
print(answer(10000))
