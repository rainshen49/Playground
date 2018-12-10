# find all content until a matching closing bracket
def clipUntilBracket(code: str)->str:
    # we are already inside one bracket
    level = -1
    for i in range(len(code)):
        if code[i] == '[':
            level -= 1
        elif code[i] == ']':
            level += 1
        if level == 0:
            # bracket matched
            return code[:i]

def clipUntilBracketTest():
    sample = "3[asd4[df]]]"
    assert clipUntilBracket(sample) == '3[asd4[df]]'

# process one unit of content
def process(code:str)->str:
    result = []
    for i in range(len(code)):
        ch:str = code[i]
        if ch.isdigit():
            # TODO: continue here
    return ''.join(result)

clipUntilBracketTest()