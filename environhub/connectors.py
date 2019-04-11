import pandas as pd
import json
import time

def getIssueSummary(issue="kaveriissue"):
    try:
        df = pd.read_excel("{}.xlsx".format(issue), sheet_name="Summary")
        return df.iloc[0]["Summary"], 200
    except Exception:
        return "Error", 300


def getIssueOverTime(issue="kaveriissue"):
    try:
        df = pd.read_excel("{}.xlsx".format(issue), sheet_name="Plot2")
        List = df.values.tolist()
        List.insert(0, ["Time", "Value"])
        return json.dumps({"data": List}), 200
    except Exception:
        return "Error", 300


def getIssueAccounts(issue="kaveriissue"):
    try:
        df = pd.read_excel("{}.xlsx".format(issue), sheet_name="Accounts")
        List = df.values.tolist()
        return json.dumps({"data": List}), 200
    except Exception:
        return "Error", 300


def getIssueOverPlace(issue="kaveriissue"):
    try:
        df = pd.read_excel("{}.xlsx".format(issue), sheet_name="Plot1")
        List = df.values.tolist()
        List.insert(0, ["Place", "Value"])
        return json.dumps({"data": List}), 200
    except Exception:
        return "Error", 300


def getIssueTimeLine(issue="kaveriissue"):
    try:
        df = pd.read_excel("{}.xlsx".format(issue), sheet_name="Timeline")
        List = df.values.tolist()
        n = len(List)
        for i in range(n):
            List[i][2] = time.mktime(List[i][2].timetuple())
        return json.dumps({"data": List}), 200
    except Exception:
        return "Error", 300


# print(getIssueOverTime())
