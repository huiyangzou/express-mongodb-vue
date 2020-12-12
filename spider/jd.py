import requests,json
import os
from bs4 import BeautifulSoup


def getHtml(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
               "Referer": "https://item.jd.com"
        }
    html = requests.get(url, headers = headers)
    html.encoding = html.apparent_encoding
    return html


def getSoup(html):
    return BeautifulSoup(html.text, "html.parser")


def getTitle(soup):
    title = soup.title.contents[0]
    return str(title)


def getAllPage(soup):

    parameter2 = soup.find('ul', attrs={'class':'parameter2'})
    parameter3 = parameter2.find_all('li')
    for item in parameter3:
        print(f"{item.text}")
#     content = soup.find('div', attrs={'id':'J-detail-content'})

#     print(f"信息：{content}")

#         r_json = requests.post("https://www.93goodtea.com/v1/jd",allPage)



def makedir(title):
    try:
        os.mkdir(title)
    except:
        print(f"{title} folder is exist!")
        return


def downloadPic(title, allPage, htmlMark):
    for number in range(1,int(allPage)+1):
        picUrl = f"https://img1.nthjjz.com/pic/{htmlMark}/{number}.jpg"
        pic = getHtml(picUrl)
        with open(f"{title}/{number}.jpg", "wb+") as f:
            f.write(pic.content)
            print(f"{number}.jpg download successful!")



def main():
    for mark in range(33845,33846):
        htmlMark = str(mark)
        print(f"标题：{htmlMark}")
        try:
            html = getHtml(f"https://item.jd.com/72248141122.html")
#             print(f"html：{html.text}")
            soup = getSoup(html)
            allPage = getAllPage(soup)

#             makedir(title){"videoListName":"1","videoListLink":"2","videoListImage":"3"}
        except Exception:
            continue
#         downloadPic(title, allPage, htmlMark)


if __name__ == '__main__':
    main()
