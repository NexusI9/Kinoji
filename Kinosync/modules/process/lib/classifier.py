from lib.utils import config
from imageai.Classification import ImageClassification

model_path = config("MODEL_PATH")

class Classifier:

    def __init__(self, threshold = 10):
        print("\n\nMode 3: Update Image AI recognition database")
        self.threshold = threshold
        self.setModel(model_path)

    def setModel(self,modelPath):
        self.prediction = ImageClassification()
        self.prediction.setModelTypeAsDenseNet121()
        self.prediction.setModelPath(modelPath)
        self.prediction.loadModel()

    def getSubjects(self, file):
        print("Scanning : "+file)

        subjects = []

        #GET IMAGE RECOGNITION
        prediction, proba =  self.prediction.classifyImage(file, result_count=5 )
        for eachPrediction, eachProba in zip(prediction, proba):
            if(eachProba > self.threshold):
                print("[+]\t{:10} {:10}".format(eachPrediction,eachProba))
                subjects.append( eachPrediction )

        return subjects if len(subjects) > 0 else None