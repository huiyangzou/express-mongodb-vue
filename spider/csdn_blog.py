import requests
from lxml import etree
import re
import threading
import operator


def get_page(url):
    response = requests.get(url)
    all_page = int(re.findall('var listTotal = (.*?) ;',response.text)[0])//20 +1
    return all_page


def parse_article(url,article_list):
    response = requests.get(url).text
    x = etree.HTML(response)
    x= x.xpath('//*[@id="mainBox"]/main/div[2]/div')
    # article_list = []

    for item in x:
        print(f"yyyy{item}")
        title = item.xpath('//*[@id="mainBox"]/main/div[2]/div[1]/h4/a/text()')[1].strip()
        url = item.xpath('//*[@id="mainBox"]/main/div[2]/div[1]/h4/a/@href')
        print(f"title{title}")
#         pubdata = item.xpath('div[@class="info-box d-flex align-content-center"]/p/span[@class="date"]/text()')[0]
#         pageviews = item.xpath('div[@class="info-box d-flex align-content-center"]/p[3]/span/span/text()')[0]
#         comments = item.xpath('div[@class="info-box d-flex align-content-center"]/p[5]/span/span/text()')[0]
        article = dict(
        title = title,
        url = url
            )
        article_list.append(article)
#     print(article_list)

def main(url):
    main_url = url
    all_page = get_page(url)
    all_page = 1
    print(f"allpage{all_page}")
    thread_list = []
    data = []
    for page in range(1,all_page+1):
        url = main_url + '/article/list/' + str(page)
        t = threading.Thread(target=parse_article,args=(url,data))
        t.start()
        thread_list.append(t)

    for t in thread_list:
        t.join()

    data.sort(key=operator.itemgetter('pubdata'))
    print(data,len(data))

if __name__ == '__main__':
    url = 'https://zhangphil.blog.csdn.net'
    main(url)

