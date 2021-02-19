import requests
import os
from bs4 import BeautifulSoup


def getHtml(url,htmlMark):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
               "Referer": url
        }
    html = requests.get(f"{url}/article/list/{htmlMark}", headers = headers)
    html.encoding = "utf-8"
    print(f"{html.encoding}=======================")
    return html


def getSoup(html):
    return BeautifulSoup(html.text, "html.parser")


def getList(soup):
    list = soup.find('div',attrs={'class':'article-list'}).find_all('div',attrs={'class':'article-item-box'})
#     print(f"{list}=======88888888")
    return list


def getAllPage(soup):
    allPage = soup.find('div', attrs={'class':'ui-paging-container'}).find_all('li')[7].text
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
    blog_url=f"https://blog.csdn.net/zpcrobot"


    for mark in range(1,4):
        htmlMark = str(mark)
        try:
            html = getHtml(blog_url,htmlMark)
            soup = getSoup(html)
#             print(soup)
            list = getList(soup)
            for item in list:
#                 print(f"{item}======================================================")
                url=item.find('h4').find('a').attrs['href']
                print(url)
                title=item.find('h4').find('a').text.strip()
                print(title)
                des=item.find('p').text
                print(des)
                tag=item.find('h4').find('span').text
                print(tag)
                create_date=item.find('span',attrs={'class':'date'}).text
                print(create_date)
                read_count=item.find_all('span',attrs={'class':'read-num'})[0].text
                print(read_count)
#                 comment_count=item.find_all('span',attrs={'class':'read-num'})[1].text
                comment_count='0'
                print(comment_count)
                obj={'csdnblogLink':url,'csdnblogName':title,'des':des,'tag':tag,'create_date':create_date,'read_count':read_count,'comment_count':comment_count}
                r_json = requests.post("https://www.93goodtea.com/v1/csdnblog",obj)
                print(r_json.text)
#                 tag=item.find['h4'].find['span'].text
#
#                 des=item.find['p'].find['a'].text
#                 create_date=item.find('span',attrs['class':'date']).text
#                 read_count=item.find('span',attrs['class':'read-num']).contents[0].text
#                 comment_count=item.find('span',attrs['class':'read-num']).contents[1].text
#                 obj={'url':url,'title':title,'tag':tag,'des':des,'create_date':create_date,'read_count':read_count,'comment_count':comment_count}


#             makedir(title)
        except:
            continue
#         downloadPic(title, allPage, htmlMark)


if __name__ == '__main__':
    main()
