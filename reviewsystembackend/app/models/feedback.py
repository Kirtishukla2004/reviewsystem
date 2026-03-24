from datetime import datetime
from typing import Optional
class Feedback:
    def __init__(self,id:int,categoryname:str,subcategory:str,reviewtype:str,reviewtext:str,ishidden:bool,isblocked:bool,created_at:datetime,sentimentscore:Optional[float]=None,recommended:Optional[bool]=None,sentimentlabel:Optional[str]=None,sentimentreason:Optional[str]=None):
        self.id=id
        self.categoryname=categoryname
        self.subcategory=subcategory
        self.reviewtype=reviewtype
        self.reviewtext=reviewtext
        self.ishidden=ishidden
        self.isblocked=isblocked
        self.created_at=created_at
        self.sentimentscore=sentimentscore
        self.semtimentlabel=sentimentlabel
        self.sentimentreason=sentimentreason
        self.recommended=recommended
    
    