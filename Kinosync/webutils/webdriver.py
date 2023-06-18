from selenium import webdriver
from selenium.webdriver.chrome.options import Options


options = Options()
options.add_argument("--headless=new")
Driver = webdriver.Chrome(options=options)
