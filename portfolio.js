import { LightningElement, track } from 'lwc';
import insertRecord from '@salesforce/apex/ContactMe_record_insert.Forminsert_record';
import college from '@salesforce/resourceUrl/college';
import profile from '@salesforce/resourceUrl/ProfileImage';
import linkedin from '@salesforce/resourceUrl/linkedin';
import gmail from '@salesforce/resourceUrl/gmail';
import github from '@salesforce/resourceUrl/github';
import trailhead from '@salesforce/resourceUrl/trailhead';
import Ranger from '@salesforce/resourceUrl/Ranger';
import Java from '@salesforce/resourceUrl/Java';
import html from '@salesforce/resourceUrl/html';
import Salesforce from '@salesforce/resourceUrl/Salesforce';
import sql from '@salesforce/resourceUrl/sql';
import graduation from '@salesforce/resourceUrl/graduation';
import skill from '@salesforce/resourceUrl/skill';
import product from '@salesforce/resourceUrl/products';
import learner from '@salesforce/resourceUrl/learner';
import brain from '@salesforce/resourceUrl/brain';
import team from '@salesforce/resourceUrl/team';
import solver from '@salesforce/resourceUrl/solver';
import adaptability from '@salesforce/resourceUrl/adaptability';
import leadership from '@salesforce/resourceUrl/leadership';
import vscode from '@salesforce/resourceUrl/vscode';
import postman from '@salesforce/resourceUrl/postman';
import dbms from '@salesforce/resourceUrl/dbms';

export default class Portfolio extends LightningElement {
    linkedinurl = linkedin;         learnerurl = learner;
    gmailurl = gmail;               brainurl= brain;
    githuburl = github;             teamurl = team;
    trialheadurl = trailhead;       solverurl = solver;
    javaurl = Java;                 adaptabilityurl = adaptability;
    htmlurl = html;                 leadershipurl = leadership;
    salesforceurl = Salesforce;     vscodeurl = vscode;
    sqlurl = sql;                   postmanurl = postman;
    summaryDetail = false;          dbmsurl = dbms;
    educationdetail = false;        profileurl = profile;
    otherdetail = false;
    interestdetail = false;
    graduationurl = graduation;
    Rangerurl = Ranger;
    Projectdetail = false;
    skillurl = skill;
    producturl = product;
    Skilldetail = false;
    collegeurl = college;
  
      inputFirst = ''; inputlast = ''; inputEmail = ''; inputContact;
      inputSubject = ''; 
    handlefname(event){
          this.inputFirst = event.target.value;
    }

    handlelname(event){
          this.inputlast = event.target.value;
    }

    handleEmail(event){
          this.inputEmail = event.target.value;
    }

    handleContact(event){
          this.inputContact = event.target.value;
          console.log(typeof this.inputContact);
    }

    handleSubject(event){
          this.inputSubject= event.target.value;
    }

    handleSubmit(event){
        insertRecord({ fname:  this.inputFirst, lname :  this.inputlast, email :  this.inputEmail, phone :  this.inputContact, message :  this.inputSubject})
            .then(result => {
                // Handle success
                console.log('Record inserted successfully:', result);
            })
            .catch(error => {
                // Handle error
                console.error('Error inserting record:', error);
            });

    }

    boxStyle1 = 'background-color: #F1C40F;';
    boxStyle2 = 'background-color: #F1C40F;';
    boxStyle3 = 'background-color: #F1C40F;';
    boxStyle4 = 'background-color: #F1C40F;';
    boxStyle5 = 'background-color: #F1C40F;';
    boxStyle6 = 'background-color: #F1C40F;';

    connectedCallback() {          
          this.handleChangeColor3();
    }

   
    handleChangeColor1(){
          this.boxStyle1 = 'background-color: white;';
          this.summaryDetail = true;
          this.Projectdetail = false;
          this.Skilldetail = false;
          this.educationdetail = false;
          this.otherdetail = false;
          this.interestdetail = false;
          this.boxStyle2 = 'background-color: #F1C40F;';
          this.boxStyle3 = 'background-color: #F1C40F;';
          this.boxStyle4 = 'background-color: #F1C40F;';
          this.boxStyle5 = 'background-color: #F1C40F;';
          this.boxStyle6 = 'background-color: #F1C40F;';
    }

    handleChangeColor2(){
          this.boxStyle2 = 'background-color: white;';
          this.summaryDetail = false;
          this.Projectdetail = true;
          this.Skilldetail = false;
          this.educationdetail = false;
          this.otherdetail = false;
          this.interestdetail = false;
          this.boxStyle1 = 'background-color: #F1C40F;';
          this.boxStyle3 = 'background-color: #F1C40F;';
          this.boxStyle4 = 'background-color: #F1C40F;';
          this.boxStyle5 = 'background-color: #F1C40F;';
          this.boxStyle6 = 'background-color: #F1C40F;';
    }
    handleChangeColor3(){
          this.summaryDetail = false;
          this.Projectdetail = false;
          this.Skilldetail = true;
          this.educationdetail = false;
          this.otherdetail = false;
          this.interestdetail = false;
          this.boxStyle3 = 'background-color: white;';
          this.boxStyle2 = 'background-color: #F1C40F;';
          this.boxStyle1 = 'background-color: #F1C40F;';
          this.boxStyle4 = 'background-color: #F1C40F;';
          this.boxStyle5 = 'background-color: #F1C40F;';
          this.boxStyle6 = 'background-color: #F1C40F;';
    }
    handleChangeColor4(){
          this.boxStyle4 = 'background-color: white;';
          this.summaryDetail = false;
          this.Projectdetail = false;
          this.Skilldetail = false;
          this.educationdetail = true;
          this.otherdetail = false;
          this.interestdetail = false;
          this.boxStyle2 = 'background-color: #F1C40F;';
          this.boxStyle3 = 'background-color: #F1C40F;';
          this.boxStyle1 = 'background-color: #F1C40F;';
          this.boxStyle5 = 'background-color: #F1C40F;';
          this.boxStyle6 = 'background-color: #F1C40F;';
    }
    handleChangeColor5(){
          this.summaryDetail = false;
          this.Projectdetail = false;
          this.Skilldetail = false;
          this.educationdetail = false;
          this.interestdetail = true;
          this.boxStyle5 = 'background-color: white;';
          this.boxStyle2 = 'background-color: #F1C40F;';
          this.boxStyle3 = 'background-color: #F1C40F;';
          this.boxStyle4 = 'background-color: #F1C40F;';
          this.boxStyle1 = 'background-color: #F1C40F;';
          this.boxStyle6 = 'background-color: #F1C40F;';
    }
    handleChangeColor6(){
          this.otherdetail = true;
          this.summaryDetail = false;
          this.Projectdetail = false;
          this.Skilldetail = false;
          this.educationdetail = false;
          this.interestdetail = false;
          this.boxStyle6 = 'background-color: white;';
          this.boxStyle2 = 'background-color: #F1C40F;';
          this.boxStyle3 = 'background-color: #F1C40F;';
          this.boxStyle4 = 'background-color: #F1C40F;';
          this.boxStyle5 = 'background-color: #F1C40F;';
          this.boxStyle1 = 'background-color: #F1C40F;';
    }
  
}