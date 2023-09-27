import re

f = open('.csnp/taro/py.csnp')

contents = f.read()

STR_DIVIDER = '---'

indexFirstDivider = contents.index(STR_DIVIDER)

indexlastDivider = contents.index(STR_DIVIDER, indexFirstDivider + len(STR_DIVIDER))

outStr = contents[indexFirstDivider + len(STR_DIVIDER):indexlastDivider]

for item in list(
    filter(lambda str: str != '', outStr.splitlines())
):
    _m = re.split(r':\s*', item)
    print(_m)
