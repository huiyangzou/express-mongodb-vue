import requests,json
import os, time, random
from bs4 import BeautifulSoup
import time
import re


def getHtml(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
               "Referer": "https://www.tupianzj.com"
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
    allPage = soup.select('#container > div > div > div:nth-child(3) > div.article_con_box > div.pages > ul > li:nth-child(1) > a')[0]
    print(allPage)
    pattern = re.compile(r'\d+')
    aaa=pattern.findall(f"{allPage}")[0]
    print(aaa)
    return aaa

def getOuterAllPage(soup):
    allPage = soup.select('#container > div > div > div:nth-child(4) > div > div.pages > ul > li:nth-child(15) > span > strong:nth-child(1)')[0]
    print(allPage)
    pattern = re.compile(r'\d+')
    aaa=pattern.findall(f"{allPage}")[0]
    print(aaa)
    return aaa


def getImage(soup):
    imageUrl = soup.find('img', attrs={'id':'bigpicimg'}).attrs['src']
    return imageUrl

def makedir(title):
    try:
        os.mkdir(title)
    except:
        print(f"{title} folder is exist!")
        return


def downloadPic(title, imageUrl,number):
    pic = getHtml(imageUrl)
    with open(f"{title}/{number}.jpg", "wb+") as f:
        f.write(pic.content)
        print(f"{number}.jpg download successful!")


def findPageByParam(param):
    try:
        print(param)
        html = getHtml(param['picUrl'])
        soup = getSoup(html)
        title = getTitle(soup)
        allPage = getAllPage(soup)
        userId =time.time()
        for mark in range(1,int(allPage)):
            try:
                htmlUrl=''
                if mark==1:
                    htmlUrl=param['picUrl']
                else:
                    newUrl=param['picUrl'].replace(".html","",1)
                    htmlUrl=f"{newUrl}_{mark}.html"
                print(f"htmlUrl：{htmlUrl}")
                innerHtml = getHtml(htmlUrl)
                innersoup = getSoup(innerHtml)
                imageUrl = getImage(innersoup)
                allData={"mmpictureImage":imageUrl,"mmpictureName":param['title'],"date":param['date'],"tag":param['tag'],"visited":param['visited'],"userId":userId}
                print(allPage)
                r_json = requests.post("https://www.93goodtea.com/v1/mmpicture",allData)
                time.sleep(random.random() * 3)
    #             downloadPic(title, imageUrl,mark)
            except Exception as e:
                        print(e)
    except:
        print('no file')


def findPage(date,number):
    try:
        html = getHtml(f"https://www.tupianzj.com/meinv/{date}/{number}.html")
        soup = getSoup(html)
        title = getTitle(soup)
        allPage = getAllPage(soup)
        makedir(title)
    except:
        print('no file')
    for mark in range(1,int(allPage)):
        try:
            htmlUrl=''
            if mark==1:
                htmlUrl=f'https://www.tupianzj.com/meinv/{date}/{number}.html'
            else:
                htmlUrl=f"https://www.tupianzj.com/meinv/{date}/{number}_{mark}.html"
            print(f"htmlUrl：{htmlUrl}")
            innerHtml = getHtml(htmlUrl)
            innersoup = getSoup(innerHtml)
            imageUrl = getImage(innersoup)
            allData={"pictureImage":imageUrl}
            print(allPage)
            r_json = requests.post("http://127.0.0.1:8080/v1/picture",allData)
            time.sleep(random.random() * 3)
#             downloadPic(title, imageUrl,mark)
        except:
            print('downloadFail')

def getContentList(innerSoup):
    contentList = innerSoup.select('#container > div > div > div:nth-child(4) > div > ul > li')
    print(contentList)
    return contentList

def categoryList(type,number,typeName):
    #https://www.tupianzj.com/meinv/guzhuang/
    baseUrl=f"https://www.tupianzj.com"
    base=f"{baseUrl}/meinv/{type}"
    try:
        html = getHtml(base)
        soup = getSoup(html)
        allPage = getOuterAllPage(soup)
        print("allPage:"+allPage)
    except:
        print('no file')
    for page in range(1, int(allPage)):
        newUrl=base+f"/list_{number}_{page}.html"
        print(newUrl)
        innerHtml = getHtml(newUrl)
        print(innerHtml.text)
        innerSoup = getSoup(innerHtml)
        contentList = getContentList(innerSoup)
        for item in contentList:
            picUrl=baseUrl+item.find('a').attrs['href']
            title=item.find('a').find('label').text
            date=item.find('span').find('em').text
            visited=item.find('span').find('i').text
            tag=item.find('span').find('u').find('a').text
#             print(f"picUrl:{picUrl}     title:{title}")
            param={'picUrl':picUrl,'title':title,'date':date,'tag':tag,'visited':visited}

            findPageByParam(param)


def main():
    list=[["xiezhen","179","清纯美女"]
    ,["xinggan","176","性感美女"]
    ,["guzhuang","177","古装美女"]
    ,["yishu","178","人体艺术"]
    ,["siwa","193","丝袜美女"]
    ,["chemo","194","香车美人"]
    ,["mm","218","美女专题"]]
    for item in list:
        print(item[0],item[1],item[2])
        categoryList(item[0],item[1],item[2])



if __name__ == '__main__':
    main()
