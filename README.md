# WIP: Food registration API

## About
This application receives food business registrations, then forwards them to a mockup of Local Authority's MIS systems in the appropriate format.
Additional capabilities are listed under 'features'.

## Routes
`/send` - Sends new registration details to a specified mock-MIS. See [exampleSend.json](exampleSend.json) for correct format of config and data.

`/retrieve` - Retrieves all registration details from all mock-MIS stores.

`/retrieve/:authorityCode` (e.g. `001`) - Retrieves all registration details from the specified mock-MIS store.

`GET/fhrs` - Gets all establishments from the FHRS feed

`GET/fhrs/:la` (e.g. `Bristol`) - Gets all establishments from specified Local Authoritiies

`POST/fhrs/buildReport` - Uses options to construct a report from FHRS data

## Options
`?standardised=false` - When retrieving, you can use this query to return details in the native MIS format, rather than converting it back to the standardised format.

`la` - When using FHRS/buildReport, list of local authorities to include in report.

`excludedData` - When using FHRS/buildReport, list of params to exclude from the results.

`filters` - When using FHRS/buildReport, object of filters to apply to the search query. Keys and values allowed can be found [here](http://api.ratings.food.gov.uk/Help/Api/GET-Establishments_name_address_longitude_latitude_maxDistanceLimit_businessTypeId_schemeTypeKey_ratingKey_ratingOperatorKey_localAuthorityId_countryId_sortOptionKey_pageNumber_pageSize) 

`cutoffDate` - When using FHRS/buildReport, will remove any results with a "RatingDate" after this date.

## Features (WIP)
- Randomised intentional failure for development
- Convert from standardised format to custom LA format
- Convert from custom LA format to standardised format
- Send an email notification to a specified recipient
- Validate the premises identified in a registration
- Connect to FHRS

## Pushing to GOV.UK PaaS
1. Log in with `cf login -a api.cloud.service.gov.uk -u USERNAME`
2. Enter the password
3. Temporarily remove the node_modules directory (failing to do this will result in a symlink error)
4. `cf push`
5. Access at: `https://node-app-paas-test.cloudapps.digital` (the URL is determined by `manifest.yml`)
