var json2xls = require('json2xls');
var fs=require('fs');


let links = [];
let finalData = [];
let informationFetchPowerName = [{
    'quick-facts': [
        { 'location': '#ctl00_ContentPlaceHolder1_lblLocation' },
        { 'schoolType': '#ctl00_ContentPlaceHolder1_lblSchoolType' },
        { 'Language': '#ctl00_ContentPlaceHolder1_lblLanguage' },
        { 'Full-time Undergraduate': '#ctl00_ContentPlaceHolder1_lblStudents' },
        { 'Entrance Dates': '#ctl00_ContentPlaceHolder1_lblEntranceDates' },
        { 'Canadian Student Tuition STARTING AT': '#ctl00_ContentPlaceHolder1_lblTuitionCanada' }
    ],
    'Programs': [
        { 'degree': 'a[id$="hylProgram"]' }
    ],
}];
const cheerio = require('cheerio');
const request = require('request');
var fs = require('fs');
let filename = '1587664550887';
let replaceStringInLink = 'Quick-Facts';

class College {
    constructor(target) {
        this.Name = terget.name;
        this.Type = target.schoolType;
    }
}

fs.readFile(`./${filename}.txt`, 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('done');
        tempList = data.split(',');
        iterateIntoAllLinks(tempList);
        console.log(finalData);
    }
});


function iterateIntoAllLinks(links) {
    Object.keys(informationFetchPowerName[0]).forEach((element, index) => {
        links.forEach((link, index, array) => {
            link = link.slice(0,link.lastIndexOf('/'));
            link=link+'/';
            request(`${link.replace(replaceStringInLink, element)}`, function (error, response, body) {
                //console.error('error:', error); // Print the error if one occurred
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // Print the HTML for the Google homepage.
                if (!error) {
                    functionsName.infromationGether(body, link);

                }
            });
        })
    })

}


let functionsName = {};

functionsName.infromationGether = (html, link) => {
    let data = {};
    data["link"] = link.slice(0,link.lastIndexOf('/'));
    data["link"]=data["link"]+'/';
    
    informationFetchPowerName.forEach((typeOfInformations, index, array) => {
        Object.keys(typeOfInformations).forEach((information, index, array) => {
            typeOfInformations[information].forEach((subinformation, index, array) => {
                Object.keys(subinformation).forEach((subinformation_name, index, array) => {
                    console.log(data.link);

                    //data[subinformation_name] = { "id": subinformation[subinformation_name], "value": fetchinformationFromHtml(html, "id", subinformation[subinformation_name]) };
                    data[subinformation_name] =  fetchinformationFromHtml(html, "id", subinformation[subinformation_name]);
                    console.log(`Fetching ${subinformation_name} with this id:-${fetchinformationFromHtml(html, "id", subinformation[subinformation_name])}`);
                })
            })
        })
        finalData.push(data);
        var json2xls = require('json2xls');
        var xls = json2xls(finalData);
        fs.writeFileSync('data.xlsx', xls, 'binary');
    })
}


function fetchinformationFromHtml(html, typeOfIdentification, idAttribute) {
    let $ = cheerio.load(html);
    let text = $(`${idAttribute}`).text();
    console.log(text);
    return text;
}