#!/usr/bin/env bash

# cache census age
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' aceapidev:8081)" != "200" ]]; do 
    printf '.'
    sleep 1
done
result=$(curl -X GET --header "Accept: */*" "http://aceapidev:8081/api/cacheCensusAge")
echo "Response from server"
echo $result

result=$(curl -X GET --header "Accept: */*" "http://aceapidev:8081/api/cacheCensusAffordability")
echo "Response from server"
echo $result

result=$(curl -X GET --header "Accept: */*" "http://aceapidev:8081/api/cacheCensusRent")
echo "Response from server"
echo $result

result=$(curl -X GET --header "Accept: */*" "http://aceapidev:8081/api/cacheCensusHomePrice")
echo "Response from server"
echo $result

result=$(curl -X GET --header "Accept: */*" "http://aceapidev:8081/api/cacheCensusHousingOcc")
echo "Response from server"
echo $result

result=$(curl -X GET --header "Accept: */*" "http://aceapidev:8081/api/cacheCensusIncomeEmploymentEducation")
echo "Response from server"
echo $result

result=$(curl -X GET --header "Accept: */*" "http://aceapidev:8081/api/cacheCensusEduTract")
echo "Response from server"
echo $result

result=$(curl -X GET --header "Accept: */*" "http://aceapidev:8081/api/cacheCensusEduTown")
echo "Response from server"
echo $result

npm run dev