from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

class Webdriver(Chrome):

    def __init__(self, headless=True):
        options = Options()
        if(headless):
            options.add_argument("--headless=new")
        
        super().__init__(options=options)
    
    
    def find_element_by_className(self, className):
        return super().find_element(By.CLASS_NAME, className)
    
    def find_elements_by_className(self, className):
        return super().find_elements(By.CLASS_NAME, className)
    
    def find_element_by_tagName(self, tagName):
        return super().find_element(By.TAG_NAME, tagName)
    
    def find_elements_by_tagName(self, tagName):
        return super().find_elements(By.TAG_NAME, tagName)
    
    def find_elements_by_CSS(self, cssName):
        return super().find_elements(By.CSS_SELECTOR, cssName)
    
    def find_element_by_CSS(self, cssName):
        return super().find_element(By.CSS_SELECTOR, cssName)
    
    
