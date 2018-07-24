'''
    Author: Lingkai Shen
'''

from datetime import datetime
from collections import OrderedDict
# input

actions = [
    # try a short position
    # {'date': '1992/07/13 11:12:30', 'action': 'SELL',
    # 'price': '12.3', 'ticker': 'AAPL', 'shares': '500'},
    {'d14ate': '1992/07/14 11:12:30', 'action': 'BUY',
        'price': '12.3', 'ticker': 'AAPL', 'shares': '500'},
    {'date': '1992/09/13 11:15:20', 'action': 'SELL',
        'price': '15.3', 'ticker': 'AAPL', 'shares': '100'},
    {'date': '1992/10/14 15:14:20', 'action': 'BUY',
        'price': '20', 'ticker': 'MSFT', 'shares': '300'},
    {'date': '1992/10/17 16:14:30', 'action': 'SELL',
        'price': '20.2', 'ticker': 'MSFT', 'shares': '200'},
    {'date': '1992/10/19 15:14:20', 'action': 'BUY',
        'price': '21', 'ticker': 'MSFT', 'shares': '500'},
    {'date': '1992/10/23 16:14:30', 'action': 'SELL',
        'price': '18.2', 'ticker': 'MSFT', 'shares': '600'},
    {'date': '1992/10/25 10:15:20', 'action': 'SELL',
        'price': '20.3', 'ticker': 'AAPL', 'shares': '300'},
    {'date': '1992/10/25 16:12:10', 'action': 'BUY',
        'price': '18.3', 'ticker': 'MSFT', 'shares': '500'}
]

stock_actions = [
    {'date': '1992/08/14', 'dividend': '0.10', 'split': '', 'stock': 'AAPL'},
    {'date': '1992/09/01', 'dividend': '', 'split': '3', 'stock': 'AAPL'},
    {'date': '1992/10/15', 'dividend': '0.20', 'split': '', 'stock': 'MSFT'},
    {'date': '1992/10/16', 'dividend': '0.20', 'split': '', 'stock': 'ABC'}
]

# Design:
# Keep a current portfolio state
# Apply transactions and generate statements

# Unclear cases:
# Order of stock actions vs my actions?

# Nomenclature:
# Functions are camelCase, variables are under_scored if too long

def applyMyAction(action, portfolio):
    '''apply my action, return statement'''
    holdings = portfolio["holdings"]
    statement = ""
    price = float(action["price"])
    shares = int(action["shares"])

    if action["ticker"] not in holdings:
        # prepopulate portfolio if not already, this will allow for short position to run correctly
        holdings[action["ticker"]] = {
            "price": price,
            # allow short position
            "shares": 0
        }

    stock = holdings[action["ticker"]]

    if action["action"] == "SELL":
        # sell
        stock["shares"] -= shares
        profit = shares * (price - stock["price"])
        if stock["shares"] == 0:
            del holdings[action["ticker"]]
        statement = "    - You sold {shares} shares of {ticker} at a price of ${price:.2f} per share for a {effect} of ${profit:.2f}\n".format(
            **action, effect="profit" if profit > 0 else "loss", profit=profit)
    else:
        # buy
        oldcap = stock["shares"] * stock["price"]
        newcap = oldcap + price * shares
        stock["shares"] += shares
        # clean house
        if stock["shares"] == 0:
            del holdings[action["ticker"]]
        else:
            stock["price"] = newcap / stock["shares"]
        statement = "    - You bought {shares} shares of {ticker} at a price of ${price:.2f} per share\n".format(
            **action)

    return statement


def applyMarketAction(action, portfolio):
    '''apply market action and return a statement for that market transaction'''
    holdings = portfolio["holdings"]
    statement = ""
    if action["ticker"] in holdings:
        # do not care about stock actions outside of portfolio
        stock = holdings[action["ticker"]]
        if not action["split"] == '':
            # split
            oldshares = stock["shares"]
            newshares = oldshares * int(action["split"])
            stock["shares"] = newshares
            stock["price"] *= oldshares / newshares
            statement = "    - {ticker} split {split} to 1, ".format(**action)
        elif not action["dividend"] == '':
            # dividend
            portfolio["dividends"] += float(action["dividend"]
                                            ) * stock["shares"]
            statement = "    - {ticker} paid out ${dividend:.2f} dividend per share, ".format(
                ticker=action["ticker"], dividend=float(action["dividend"]))
        statement += "and you have {shares} shares\n".format(**stock)
    return statement


def parseDate(date_str):
    '''convert date string to date object so that it becomes comparable'''
    return datetime.strptime(date_str[0:10], "%Y/%m/%d")


def stringifyDate(date):
    '''convert data to string with the correct format'''
    return datetime.strftime(date, "%Y-%m-%d")


def indexActions(actions, stock_actions):
    '''index all the actions by date, preserving order. standardize naming of stock/ticker, and add a type
        return an OrderedDict
    '''

    my_actions = [dict(type="my", **action) for action in actions]
    for action in my_actions:
        action["price"] = float(action["price"])

    market_actions = [dict(type="stock", ticker=action['stock'], **action)
                      for action in stock_actions]
    market_actions.extend(my_actions)

    for action in market_actions:
        action["date"] = parseDate(action["date"])

    result = OrderedDict()

    for action in sorted(market_actions, key=lambda x: x["date"]):
        # sort by date
        # Note: this is O(nlogn), however an O(n) sorting exist because each action list is already sorted and we just need to merge them in order. Here I used the sorted function for readability
        date = action["date"]
        if date in result:
            result[date].append(action)
        else:
            result[date] = [action]
    return result


def portfolioStatement(date, portfolio):
    line1 = "On " + stringifyDate(date) + ", you have:\n"
    holdings = []
    for ticker, detail in portfolio["holdings"].items():
        holdings.append(
            "    - {shares} shares of {ticker} at ${price:.2f} per share\n".format(**detail, ticker=ticker))
    if holdings == []:
        holdings.append("    No holdings at the moment\n")
    # show no decimals of there is no dividend income
    div = "    - ${dividends} of dividend income\n".format(
        dividends="0" if portfolio["dividends"] == 0 else "{:.2f}".format(portfolio["dividends"]))
    return line1 + ''.join(holdings) + div


def main():
    global actions, stock_actions
    # index all actions by date
    indexed_actions = indexActions(actions, stock_actions)
    portfolio = {
        "holdings": OrderedDict(),  # {ticker:{shares,price}}
        "dividends": 0
    }
    statements = []
    for date, actions in indexed_actions.items():
        action_statements = [applyMyAction(action, portfolio) if action["type"] == "my"
                             else applyMarketAction(action, portfolio) for action in actions]
        # if no relevant action on that day, no statment
        if ''.join(action_statements) == '':
            continue
        statements.append(portfolioStatement(date, portfolio))
        statements.append("  Transactions:\n")
        statements.extend(action_statements)
    return ''.join(statements)


expectation = ""
print(main())

# output:

"""
On 1992-07-14, you have:
    - 500 shares of AAPL at $12.30 per share
    - $0 of dividend income
  Transactions:
    - You bought 500 shares of AAPL at a price of $12.30 per share
On 1992-08-14, you have:
    - 500 shares of AAPL at $12.30 per share
    - $50.00 of dividend income
  Transactions:
    - AAPL paid out $0.10 dividend per share, and you have 500 shares
On 1992-09-01, you have:
    - 1500 shares of AAPL at $4.10 per share
    - $50.00 of dividend income
  Transactions:
    - AAPL split 3 to 1, and you have 1500 shares
On 1992-09-13, you have:
    - 1400 shares of AAPL at $4.10 per share
    - $50.00 of dividend income
  Transactions:
    - You sold 100 shares of AAPL at a price of $15.30 per share for a profit of $1120.00
On 1992-10-14, you have:
    - 1400 shares of AAPL at $4.10 per share
    - 300 shares of MSFT at $20.00 per share
    - $50.00 of dividend income
  Transactions:
    - You bought 300 shares of MSFT at a price of $20.00 per share
On 1992-10-15, you have:
    - 1400 shares of AAPL at $4.10 per share
    - 300 shares of MSFT at $20.00 per share
    - $110.00 of dividend income
  Transactions:
    - MSFT paid out $0.20 dividend per share, and you have 300 shares
On 1992-10-17, you have:
    - 1400 shares of AAPL at $4.10 per share
    - 100 shares of MSFT at $20.00 per share
    - $110.00 of dividend income
  Transactions:
    - You sold 200 shares of MSFT at a price of $20.20 per share for a profit of $40.00
On 1992-10-19, you have:
    - 1400 shares of AAPL at $4.10 per share
    - 600 shares of MSFT at $20.83 per share
    - $110.00 of dividend income
  Transactions:
    - You bought 500 shares of MSFT at a price of $21.00 per share
On 1992-10-23, you have:
    - 1400 shares of AAPL at $4.10 per share
    - $110.00 of dividend income
  Transactions:
    - You sold 600 shares of MSFT at a price of $18.20 per share for a loss of $-1580.00
On 1992-10-25, you have:
    - 1100 shares of AAPL at $4.10 per share
    - 500 shares of MSFT at $18.30 per share
    - $110.00 of dividend income
  Transactions:
    - You sold 300 shares of AAPL at a price of $20.30 per share for a profit of $4860.00
    - You bought 500 shares of MSFT at a price of $18.30 per share
"""
