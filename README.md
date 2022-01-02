# Degree Requirement Checker For UW BCS (Co-op)
Gives you information about the leftover requirements of your BCS degree at UWaterloo, using your unofficial transcript as input.

[Click me to try!](https://how2graduatebcs.herokuapp.com/)

## Conditions and Important Info
Currently, you must meet these conditions in order for the analyzer to work:

- You are a 2025 or 2026 University of Waterloo Bachelor of Computer Science (Co-op) undergrad student following [this checklist](https://cs.uwaterloo.ca/sites/ca.computer-science/files/uploads/files/2021-2022_bcs_3.pdf).

- You have not passed multiple (> 1) courses that are prerequisites of another CS course that has already been passed.

- You did not pass multiple different courses with the same number (ex. ENGL 108B and ENGL 108D).

- You did not discuss any exceptions with your CS advisor.

- You only took courses worth 0.5 units, or credit/non-credit courses.

- You did your Depth constraint with a 300 level course (so either option A, or option B with a 300 level course).

Note that the analyzer follows a heuristic of how students complete their checklist; it's not a definite algorithm, because there can exist multiple checkboxes that can be satisfied by one course (students can choose which checkbox to satisfy). Due to the unofficial transcript not including courses satisfied by AP/IB credits, you will have to take those courses into consideration after analyzing. Finally, the analyzer may contain bugs and/or errors, so don't take this too seriously; the [University Calendar](http://ugradcalendar.uwaterloo.ca/group/MATH-Computer-Science-1) always takes precedence.

## Instructions
1. Insert your University of Waterloo unofficial transcript (in PDF), by clicking on the "Choose File" button, selecting the unofficial transcript, and clicking open.
2. Click the "Analyze!" button.
3. See your requirements below!

## Privacy
The analyzer was created using JavaScript, and completely runs on browser. Thus, no data is stored remotely.

## Acknowledgments
Used [this video](https://www.youtube.com/watch?v=enfZAaTRTKU&ab_channel=dcode) to help write code for extracting text from a PDF document.
