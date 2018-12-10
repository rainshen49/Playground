# Definition for a point.
class Point:
    def __init__(self, a=0, b=0):
        self.x = a
        self.y = b


import itertools


def findabc(p1, p2):
    if p1.x == p2.x:
        return 0, 0, p1.x
    denom = p1.x-p2.x
    a = (p1.y-p2.y)/denom
    b = (p2.y * p1.x - p1.y * p2.x)/denom
    return a, b, 0


class Solution:
    def maxPoints(self, points):
        """
        :type points: List[Point]
        :rtype: int
        """
        # a line is represented by slope and y intercept, and x intercept (only for vertical lines) (a,b,c) y = ax + b or x=c
        # given two points, a = (y1-y2)/(x1-x2), b = (y2x1-y1x2)/(x1-x2), c = x1=x2
        if len(points) < 2 :
            return len(points)
        lines = {}
        for p1, p2 in itertools.product(points, repeat=2):
            if p1 == p2:
                continue
            line = findabc(p1, p2)
            if line in lines:
                lines[line].add(p1)
                lines[line].add(p2)
            else:
                lines[line] = set([p1, p2])
        return max([len(group) for group in lines.values()])


sol = Solution()
points = [Point(p[0], p[1])
          for p in [[0, 0], [94911151, 94911150], [94911152, 94911151]]]
sol.maxPoints(points)
