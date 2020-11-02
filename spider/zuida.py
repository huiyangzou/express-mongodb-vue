import requests
import os
from bs4 import BeautifulSoup


def getHtml(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
               "Referer": "http://zuidazy4.com"
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
    warp_dom = soup.find('div', attrs={'class':'warp'})
    title = warp_dom.find('div', attrs={'class':'vodh'}).find('h2').text
    thumb = warp_dom.find('div', attrs={'class':'vodImg'}).find('img').attrs['src']
    source_url = warp_dom.find('div', attrs={'id':'play_1'}).find('input', attrs={'name':'copy_sel'}).attrs['value']
    createTime = warp_dom.find('div', attrs={'class':'vodinfobox'}).find('ul').contents[17].find('span').text
    area = warp_dom.find('div', attrs={'class':'vodinfobox'}).find('ul').contents[9].find('span').text
    language = warp_dom.find('div', attrs={'class': 'vodinfobox'}).find('ul').contents[11].find('span').text
    release = warp_dom.find('div', attrs={'class': 'vodinfobox'}).find('ul').contents[13].find('span').text
    allPage = {'title':title,'thumb':thumb,'source_url':source_url,'createTime':createTime,'area':area,'language':language,'release':release}
    return allPage


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
    for mark in range(32994,33992):
        htmlMark = str(mark)
        print(f"标题：{htmlMark}")
        try:
            html = getHtml(f"http://zuidazy4.com/?m=vod-detail-id-{htmlMark}.html")
            soup = getSoup(html)
            allPage = getAllPage(soup)
            print(f"信息：{allPage}")
#             makedir(title)
        except:
            continue
#         downloadPic(title, allPage, htmlMark)


if __name__ == '__main__':
    main()
