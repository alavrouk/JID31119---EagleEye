# Eagle Eye

A machine learning solution for US Air Force route planning.

## Version 0.4.0
### New Features
- Linked up 3 time-series utilization models to front end - now results are graphed through FastAPI
- Created a better map visualization using more modern tools
- Linked linear programming based route planning to a table at the bottom of the route planning page.
### Bug Fixes
- Fixed SARIMA bug where the resultant distribution would just be completely random
### Known Issues
- Models are not tuned and thus do not represent final performance (but better tuned than last time)
- neuralprophet model is trained on a different dataset and thus produces different results.

## Version 0.3.0
### New Features
- Created three models for airfield utilization time series prediction
- Created synthetic data generator to use in airfield utilization
- Created linear programming instance for fleet route planning
### Bug Fixes
- Fixed up bugs in the route planning visualization
### Known Issues
- Models are not tuned and thus do not represent final performance

## Version 0.2.0
### New Features
- Added business plot showing airfield ground clearance trends
- Added a file drop page for uploading new aifrield data
- Added flight route planning visualization in map component
### Bug Fixes
- Modularized airfield and business data from their respective components
### Known Issues
- Map view can be buggy rendering between frames

## Version 0.1.0
### New Features
- Added Dropdown menu for Airfields
- Added Map component for route planning
- Created centralized dashboard for flight stats
### Bug Fixes
- Refactored Artifact code to ensure variables were properly tracked across Dashboard tabs 
### Known Issues
- Hardcoded airfield data
