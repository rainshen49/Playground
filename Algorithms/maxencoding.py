# https: // leetcode.com/problems/decode-ways/


def numDecodings(s):
    """
    :type s: str
    :rtype: int
    """
    n = len(s)
    if n == 0:
        return 0
    if n == 1:
        return 0 if s == '0' else 1
    if s[0] == '0':
        return 0
    for tenth in range(10):
        if tenth!=1 and tenth != 2 and str(tenth) + '0' in s:
            return 0
    combined = [False for i in range(n-1)]
    separate = [False for i in range(n-1)]
    for i in range(n-1):
        first = int(s[i])
        second = int(s[i+1])
        if first != 0:
            if first == 1:
                combined[i] = True
            if first == 2:
                combined[i] = second <= 6
            if second != 0:
                separate[i] = True
    

enc = numDecodings("23423")
print(enc)