![Eagle Eye Logo](https://github.com/alavrouk/jic3119-eagleeye/blob/main/EAGLE_EYE_logo.png)
# Eagle Eye: Advanced Route Planning Solution for US Air Force

## ✈️ Introduction

Eagle Eye is an innovative machine learning solution designed to streamline route planning for the US Air Force. This project leverages advanced predictive models and optimization techniques to enhance operational efficiency and decision-making.

## 🗝️ Key Features

- **Predictive Analysis**: Utilizes SARIMA, LSTMs, and Neuralprophet models to generate accurate airfield utilization predictions.
- **Optimization**: Implements linear programming optimization for effective route planning.
- **Scalable Architecture**: Designed to seamlessly integrate with existing systems and scale according to operational demands.

## 💻 Getting Started

Follow these steps to set up the Eagle Eye environment on your machine:

### Prerequisites

- Python 3.10.8 (for backend setup)
- Node.js and npm (for frontend setup)

### Installation

1. **Create a Conda Environment**:
   ```shell
   conda create --name eagle-eye python=3.10.8
   conda activate eagle-eye
2. **Clone and navigate to github repository**
   ```shell
   git clone https://github.com/alavrouk/jic3119-eagleeye.git
   cd eagleeye
3. **Install Python Dependencies:**
   ```shell
   pip install -r requirements.txt
4. **Run the Backend Server:**
   ```shell
   python api_fastapi.py
5. **Open a New Shell and Set Up the Frontend:**
    ```shell
    npm install
    npm start
6. **The front and backend should be running!**

## ✍️ Release Notes 

### Version 1.0.0
#### New Features
- Built full-functioning linear programming optimizer for airfield balancing.
- User ability to input their own supplies
- Time matrix for different airfields in order to make optimization factually correct.
#### Bug Fixes
- Fixed bug where the route planning map was zoomed into a weird place in California on startup.
#### Known Issues
- Arrow formatting is not pleasant to look at in route planning.

### Version 0.4.0
#### New Features
- Linked up 3 time-series utilization models to front end - now results are graphed through FastAPI
- Created a better map visualization using more modern tools
- Linked linear programming based route planning to a table at the bottom of the route planning page.
#### Bug Fixes
- Fixed SARIMA bug where the resultant distribution would just be completely random
#### Known Issues
- Models are not tuned and thus do not represent final performance (but better tuned than last time)
- neuralprophet model is trained on a different dataset and thus produces different results.

### Version 0.3.0
#### New Features
- Created three models for airfield utilization time series prediction
- Created synthetic data generator to use in airfield utilization
- Created linear programming instance for fleet route planning
#### Bug Fixes
- Fixed up bugs in the route planning visualization
#### Known Issues
- Models are not tuned and thus do not represent final performance

### Version 0.2.0
#### New Features
- Added business plot showing airfield ground clearance trends
- Added a file drop page for uploading new aifrield data
- Added flight route planning visualization in map component
#### Bug Fixes
- Modularized airfield and business data from their respective components
#### Known Issues
- Map view can be buggy rendering between frames

### Version 0.1.0
#### New Features
- Added Dropdown menu for Airfields
- Added Map component for route planning
- Created centralized dashboard for flight stats
#### Bug Fixes
- Refactored Artifact code to ensure variables were properly tracked across Dashboard tabs 
#### Known Issues
- Hardcoded airfield data

## 🎥 Sprint Demo Videos

In each sprint of the Eagle Eye project, we've captured key developments and features through demo videos. These videos provide a visual overview of our progress and the functionalities implemented in each phase.

### Sprint 2: [Initial Frontend Build-up and Containerization](#sprint-2-video)

<details>
<summary>Watch Sprint 2 Demo</summary>
<p>

[![Sprint 2 Demo](http://img.youtube.com/vi/0Qiomzz2VQ4/0.jpg)](http://www.youtube.com/watch?v=0Qiomzz2VQ4)

</p>
</details>

### Sprint 3: [Machine Learning Implementation Beginning](#sprint-3-video)

<details>
<summary>Watch Sprint 3 Demo</summary>
<p>

[![Sprint 3 Demo](http://img.youtube.com/vi/D1LilJZND2c/0.jpg)](http://www.youtube.com/watch?v=D1LilJZND2c)

</p>
</details>

### Sprint 4: [Further Machine Learning Implementation](#sprint-4-video)

<details>
<summary>Watch Sprint 4 Demo</summary>
<p>

[![Sprint 4 Demo](http://img.youtube.com/vi/xF8RNkDrioI/0.jpg)](http://www.youtube.com/watch?v=xF8RNkDrioI)

</p>
</details>

### Sprint 5: [Finalization and Deployment](#sprint-5-video)

<details>
<summary>Watch Sprint 5 Demo (will be here in a few days)</summary>
<p>

[![Sprint 5 Demo](http://img.youtube.com/vi/VIDEO_ID/0.jpg)](http://www.youtube.com/watch?v=VIDEO_ID)

</p>
</details>

*Click on the titles to expand and view each sprint's demo video.*

---

Enjoy watching the journey of Eagle Eye from conception to completion!

## 📫 Contact Us

Should the need arise, feel free to contact the developers of this project for any sort of support!
SCHOOL = gatech.edu

### Anton Lavrouk
- antonlavrouk\[AT\]\[SCHOOL\]
- [LinkedIn](https://www.linkedin.com/in/alavrouk/)
### Ivan Zapote
- izapote3\[AT\]\[SCHOOL\]
- [LinkedIn](https://www.linkedin.com/in/ivan-zapote/)
### Azhan Khan
- azkhan\[AT\]\[SCHOOL\]
- [LinkedIn](https://www.linkedin.com/in/azhank/)
### Eric Vela
- ehernandez83\[AT\]\[SCHOOL\]
- [LinkedIn](https://www.linkedin.com/in/eric-vela/)
### David Schmidt
- dschmidt44\[AT\]\[SCHOOL\]
- [LinkedIn](https://www.linkedin.com/in/david-schmidt3/)

