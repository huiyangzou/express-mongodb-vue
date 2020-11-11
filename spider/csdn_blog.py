import requests
import os
from bs4 import BeautifulSoup


def getHtml(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
               "Referer": "https://www.mm131.net"
        }
    html = requests.get(url, headers = headers)
    html.encoding = html.apparent_encoding
    return html


def getSoup(html):
    return BeautifulSoup(html.text, "html.parser")


def getList(soup):
    list = soup.find_all('div',attrs={'class':'article-item-box csdn-tracking-statistics'})
    return list


def getAllPage(soup):
    allPage = soup.find('div', attrs={'class':'ui-paging-container'}).find('ul').contents[7].text
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
    blog_url=f"https://zhangphil.blog.csdn.net/article/list"
    blog_html=getHtml(blog_url)
    blog_soup=getSoup(blog_html)
    blog_allPage = getAllPage(blog_soup)

    for mark in range(1,blog_allPage):
        htmlMark = str(mark)
        try:
            html = getHtml(f"https://zhangphil.blog.csdn.net/article/list/{htmlMark}.html")
            soup = getSoup(html)
            list = getList(soup)
            for item in list:
                url=item.find['h4'].find['a'].attrs['href']
                title=item.find['h4'].find['a'].text
                tag=item.find['h4'].find['span'].text

                des=item.find['p'].find['a'].text
                create_date=item.find('span',attrs['class':'date']).text
                read_count=item.find('span',attrs['class':'read-num']).contents[0].text
                comment_count=item.find('span',attrs['class':'read-num']).contents[1].text
                obj={'url':url,'title':title,'tag':tag,'des':des,'create_date':create_date,'read_count':read_count,'comment_count':comment_count}


            makedir(title)
        except:
            continue
        downloadPic(title, allPage, htmlMark)


if __name__ == '__main__':
    main()
