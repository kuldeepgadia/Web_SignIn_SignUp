const { expect } = require('chai');
var chai = require('chai')
	, chaiHttp = require('chai-http');
const { indexOf } = require('lodash');

chai.use(chaiHttp);
var URL = "";
var playstore_url = "";
var appstore_url = "";
var app_name = "";
var welcome_text = "";
var abc="boss"+Math.floor(Math.random() * 10000);
if(process.argv[9]=="ms" || process.argv[9]=="MS" || process.argv[9]=="" || process.argv[9]==null){
	URL="https://ms.healthline.com";
if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
	URL="https://together-msb-stage-web.healthline.com";
}
playstore_url="https://play.google.com/store/apps/details?id=com.healthline.msbuddy";
appstore_url="https://apps.apple.com/us/app/id1040195462?mt=8";
app_name="MSB";
welcome_text="Multiple Sclerosis Community";
}
if(process.argv[9]=="BC" || process.argv[9]=="bc"){
	URL="https://bc.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-bch-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.breastcancer";
	appstore_url="https://apps.apple.com/US/app/id1356340700?mt=8";
	app_name="BCH";
	welcome_text="Breast Cancer Community";
}
if(process.argv[9]=="mg" || process.argv[9]=="MG"){
	URL="https://migraine.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-mig-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.mig";
	appstore_url="https://apps.apple.com/US/app/id1494062954?mt=8";
	app_name="Migraine";
	welcome_text="Migraine Community";
}
if(process.argv[9]=="ibd" || process.argv[9]=="IBD"){
	URL="https://ibd.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-ibd-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.ibd";
	appstore_url="https://apps.apple.com/US/app/id1459294732?mt=8";
	app_name="IBD";
	welcome_text="IBD Community";
}
if(process.argv[9]=="t2d" || process.argv[9]=="T2D"){
	URL="https://t2d.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-t2d-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.t2d";
	appstore_url="https://apps.apple.com/US/app/id1498858311?mt=8";
	app_name="T2D";
	welcome_text="Type 2 Diabetes Community";
}
if(process.argv[9]=="ra" || process.argv[9]=="RA"){
	URL="https://ra.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-ra-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.ra";
	appstore_url="https://apps.apple.com/US/app/id1498862311?mt=8";
	app_name="RA";
	welcome_text="Rheumatoid Arthritis Community";
}

describe(app_name + ' Web Sign in / Sign Up ', async () => { // Started to new test-suit
	let page;

	before(async () => { /* Before hook for mocha testing, This code will be executed before each testcases */
		page = await browser.newPage(); // Opened new tab 
		//page.on('console', consoleObj => console.log(consoleObj.text())); // To display console log inside evaluate function
		await page.goto(URL, {
			waitUntil: 'networkidle2',
			// Remove the timeout
			timeout: 0
		});
		await page.setDefaultTimeout(90000);
		await page.setDefaultNavigationTimeout(90000);
	});

	after(async function () { /* After hook for mocah testing, This code will be executed after each testcases */
	//	await page.close();
	});

	it('TC-1112 *** Accept cookies and click on more information', async () => {
		var messages = []; // Declared messages array to hold the errors
		try { // Try for privecy popup

			await page.waitForSelector("app-privacy", {
				visible: true,
			  });
		    const privacyPopup = await page.$("app-privacy");  //locate app privacy pop-up
			try { 
				await page.waitForSelector("shadow/div.privacy-message-button-container", {
					visible: true,
				  });
				const container = await page.$("shadow/div.privacy-message-button-container");
				//waited for accept button to load
				await page.waitForSelector("shadow/.together-button", {
					visible: true,
				  });
				

				//located ACCEPT button
		        const acceptBtn = await container.$("shadow/.together-button");
				await acceptBtn.click();  // Clicked ACCEPT button
			} catch (e) {
				// Error will be catch here if element for 'ACCEPT' button is not located, then adding error message to messages
				messages.push("Unable to locate 'Aceept' button from privacy policy popup");
			}
	
			
		} catch (e) {
			console.log(e);
			// Error will be catch here if element for 'Privacy Policy Popup' is not located, then adding error message to messages
			messages.push("Privacy policy popup not displaying when cookie is cleared from the browser");
		}

		errormsg="";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});
	
		// Assertion for error message
		expect(errormsg).to.equal('')
		});

		it('Sorry bout alert handling', async () => {
			
			try { // Try for alert box
	
     			
				try { 
					const alertbox = await page.$("shadow/#alert-1-hdr");
					
					//located ok button
					const okBtn = await container.$("shadow/button > .alert-button-inner");
					await okBtn.click();  // Clicked ok button
				} catch (e) {
									}
		
				
			} catch (e) {
				console.log(e);
				// Error will be catch here if element for 'Privacy Policy Popup' is not located, then adding error message to messages
				messages.push("Privacy policy popup not displaying when cookie is cleared from the browser");
			}
	
			});


		it('TC-996 *** Locate Live discussion group,  drill down to the group, scroll and locate "See all replies..."', async () => {
			var messages = []; // Declared messages array to hold the errors
		try { // Try for Live Discussion group
			await page.waitFor(5000);
			await page.waitForSelector("shadow/ion-router-link:nth-child(4) > together-group-list-item", {
				visible: true,
			  });
			//const buttonHandle=await page.$("shadow/ion-router-link:nth-child(4) > together-group-list-item");
		    
			const buttons=await page.$$("shadow/ion-router-link");
			//page.evaluate(el => el.click(), buttonHandle);
			console.log(buttons.length);
			let buttonHandle=null;
			for (i = 2; i < buttons.length-5; i++) {
				try{
			//const buttonHandler=await buttons[i].$("shadow/together-group-list-item");
			buttonHandle=await buttons[i].$("shadow/.group-list-item-label");
			
			const btnTxt = await page.evaluate(buttonHandle => buttonHandle.innerText, buttonHandle);
			
			if(String(btnTxt).indexOf("Live Discussions")!==-1){
				console.log(btnTxt);
				console.log(String(btnTxt).indexOf("Live Discussions"));
			break;
			}
				
			}catch(e) {
					console.log(" ******** --> "+e);
					}
				}
			await buttonHandle.click();
			await page.waitForSelector("app-group", {
				visible: true,
			  });
			const groupPage=await page.$("app-group");
			await page.waitForSelector("shadow/together-group-title .group-title-label", {
				visible: true,
			  });
			// Located group channel title
			const titleBox=await groupPage.$("shadow/together-group-title .group-title-label");
			await page.waitForSelector("shadow/.group-title-label:not(:empty)", {
				visible: true,
			  });
			const groupChannelTitle=await groupPage.$("shadow/.group-title-label");
			// Located groupTitleText
			const groupTitleTxt = await page.evaluate(groupChannelTitle => groupChannelTitle.innerText, groupChannelTitle);
					console.log("Group Channel Title -->" + groupTitleTxt);
					if (String(groupTitleTxt).indexOf("Live Discussions") == -1) {
						messages.push("User not enters into Group Channel page on clicking 'Live Discussions' from left navigation on "+app_name+" Web Home Page");
					}
			try {
				/*
				await page.evaluate(_ => {
					// To scroll the page upto Learn More
					tstt=document.querySelector("app-group").shadowRoot.querySelector("ion-content").shadowRoot.querySelector("main");
					 tstt.scrollTop=6500; // For scrolling at specific place
					});
				*/
				await page.waitForSelector("shadow/.app-group-comment together-reply", {
					visible: true,
				  });
				const SeeAllLnks = await groupPage.$$("shadow/.app-group-comment together-reply");
			
				console.log(SeeAllLnks.length);
				var i;
				for (i = 0; i < SeeAllLnks.length; i++) {
					try{
						const SeeAllLnk = await SeeAllLnks[i].$("shadow/.more-link");
						//page.evaluate(el => el.click(), SeeAllLnk);
						await SeeAllLnk.click();
						console.log("See all Comments clicked...");
						break;
					} catch (e) {
						console.log(" ******** --> "+e);
						}
				}
			await page.waitForSelector("shadow/together-comment", {
					visible: true,
				  });
			const comments=await page.$$("shadow/together-comment");
			if(comments.length<=1){
				messages.push("On All Replies page only one comment");
			}
			/*
			try { 
				await page.waitFor(15000);
				
				const backLnk = await page.$$("shadow/.together-back-button");
				await backLnk[1].click();
				console.log("back is clicked");
			} catch (e) {
				console.log(e);
				// Error will be catch here if element for 'Back' link is not located, then adding error message to messages
				messages.push("Back Link is missing on All Replies screern");
			}
			*/
		} catch (e) {
			console.log(e);
			// Error will be catch here if element for 'See all replies' is not located, then adding error message to messages
			messages.push("Unable to locate 'See all replies' Link from thread on Group Channel page");
		}
	
			try {
				await page.waitForSelector("shadow/ion-router-link:nth-child(1) > together-nav-item", {
					visible: true,
				  });
				// Located Home link
				const homePageHandle=await page.$("shadow/ion-router-link:nth-child(1) > together-nav-item");
				await homePageHandle.click(); // Clicked on Home link
			} catch (e) {
				// Error will be catch here if element for 'Home' link is not located, then adding error message to messages
				messages.push("Problem locating Home link from Left Navigation on Group Channel Page");
			}
	
		} catch (e) {
			console.log(e);
			// Error will be catch here if element for 'Live Discussion' group channel is not located, then adding error message to messages
			messages.push("Problem locating Live Discussion link from Left Navigation on "+app_name+" Web home Page");
		}
		errormsg="";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});
		// Assertion for errormsg equals ''
		expect(errormsg).to.equal('')
		});

		it('TC-997 and TC-1013 *** Locate Learn More and subscribe to the email and Assertion for Thanks Text Close the popup(Thanks Screen)', async () => {
			var messages = []; // Declared messages array to hold the errors
			try { // Try for Learn more
				await page.waitForSelector("shadow/main", {
					visible: true,
				  });
				
									
					await page.waitForSelector("shadow/together-download-card", {
						visible: true,
					  });
								
				// Located Learn More link from Feed Card - Download prompt
				const downloadCard=await page.$("shadow/together-download-card");
				const learMoreLink = await downloadCard.$("shadow/div.link-container > together-highlight-text > div");
				
				await learMoreLink.click(); // Clicked on Learn more link
				try {
					//document.querySelector("#ion-overlay-4 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-learn-more")
					await page.waitForSelector("app-learn-more", {
						visible: true,
					  });
					// Located Learn More popup
					const learmorePopup=await page.$("app-learn-more");
					try{
						// Located heading of Learn More overlay
						const learmoreHeading=await page.$("shadow/div.email-form-heading");
						//  Located TitleTxt of Learn More overlay
						const learnmoreTitleTxt = await page.evaluate(learmoreHeading => learmoreHeading.innerText, learmoreHeading);
						console.log("Email popup title -->" + learnmoreTitleTxt);
						
						// To checking that Title text Learn More is exactly as per requirement, If not add error message to messages array
						if (String(learnmoreTitleTxt).indexOf("Want to see more?") == -1) {
							messages.push("Title inside learn more popup is not proper on "+app_name+" Web Home Page");
						}
					}catch(e){
						// If Title text inside Learn More is not located, Error will be catch here & So we are adding error message to messages array
						messages.push("Title missing inside learn more popup on "+app_name+" Web Home Page");
					}
	
					try{
						await page.waitForSelector("shadow/div.together-input > input[type=text]", {
							visible: true,
						  });
						// Located Email field inside Learn More overlay
						const learmoreInput=await page.$("shadow/div.together-input > input[type=text]");
						// For type Email-Address in Email field inside Learn More overlay
						await learmoreInput.type("dipti.gorecha@prodigyinfosoft.com");
					}catch(e){
						// If Email field inside Learn More overlay is not located, Error will be catch here & so we are adding error message to messages
						messages.push("Email Text box is missing inside learn more popup on "+app_name+" Web Home Page");
					}
	
					try{
						// Located Subsccribe button inside Learn More overlay
						await page.waitForSelector("shadow/together-email", {
							visible: true,
						  });
						const emailPopup=await page.$("shadow/together-email");
						const subscribeBtn=await emailPopup.$("shadow/together-button");
						await subscribeBtn.click(); // Clicked on Subscribe button
					}catch(e){
						// If Subscribe button inside Learn More overlay is not located, Error will be catch here & so we are adding error message to messages
						messages.push("Subscribe button is missing inside learn more popup on "+app_name+" Web Home Page");
					}
	
					try{
						await page.waitForSelector("shadow/div.signup-thanks-heading", {
							visible: true,
						  });
						// Located Thanks screen 
						const ThanksText=await page.$("shadow/div.signup-thanks-heading");
						// Located Thanks text in thanks screen 
						const ThanksTxt = await page.evaluate(ThanksText => ThanksText.innerText, ThanksText);
						console.log("Thanks Text -->" + ThanksTxt);
						
						// Checking the text of the thanks screen, If it's not as per requirement then Error will be catch here & so we are adding error message to messages
						if (String(ThanksTxt).indexOf("Thanks for signing up") == -1) {
							messages.push("Proper Thanks message is not displaying after submittig email from learn more popup is not proper on "+app_name+" Web Home Page");
						}
					}catch(e){
						// Catch for Thanks message, If thanks message is not located Add error message to messages
						messages.push("Thanks message is not displaying after submitting email from learn more popup on "+app_name+" Web Home Page");
					}
	
					try{
						await page.waitForSelector("shadow/div > div > together-close-icon", {
							visible: true,
						  });
						// Located Close Button
						const closeBtn=await page.$("shadow/div > div > together-close-icon");
						await closeBtn.click(); // Clicked on close button
						//await page.waitForTimeout(2000); // Waited for 2 seconds
					}catch(e){
						// If Close button is not located, then Error will be catch here & so we are adding error message to messages
						messages.push("Close button is missing inside learn more popup on "+app_name+" Web Home Page");
					}
	
				} catch (e) { 
					// If Learn more popup is not opened, then Error will be catch here & so we are adding error message to messages
					messages.push("Learn More Popup is not displaying on clicking learn More link from Download Card on "+app_name+" Web Home Page" + console.log(e));
				}
	
			} catch (e) {
				console.log(e);
				// If Learn More link is not located, then Error will be catch here & so we are adding error message to messages
				messages.push("Learn More link inside Download Card is missing on "+app_name+" Web Home Page");
			}
			try {
				await page.waitForSelector("shadow/ion-router-link:nth-child(1) > together-nav-item", {
					visible: true,
				  });
				// Located Home link
				const homePageHandle=await page.$("shadow/ion-router-link:nth-child(1) > together-nav-item");
				await homePageHandle.click(); // Clicked on Home link
			} catch (e) {
				// Error will be catch here if element for 'Home' link is not located, then adding error message to messages
				messages.push("Problem locating Home link from Left Navigation on Group Channel Page");
			}
			errormsg = "";
			messages.forEach(function (item) { // Loop through Messages array
				errormsg = errormsg + " " + item + "\n";
			});
			console.log(errormsg);
			// Assertion for errormsg equals ''
			expect(errormsg).to.equal('')
			
		});		

	it('***Email Sign Up page ', async () => {
		var messages = []; // Declared messages array to hold the errors

		try { // Try for privacy popup
			await page.waitFor(3000);
			await page.waitForSelector("shadow/div.desktop", {
				visible: true,
			  });
			const container = await page.$("shadow/div.desktop .right-pane");

			
			//located ACCEPT button
			const signup = await container.$("shadow/.together-button");
			await signup.click(); // Clicked Sign Up button
			//await page.waitForNavigation();
			try {

				await page.waitForSelector("app-registration", {
					visible: true,
				});
				const headerLeftPane = await page.$("app-registration");  //locate app privacy pop-up
				
				try {
					await page.waitForSelector("shadow/input[type = text]", {
						visible: true,
					});
					
					const emailAddressPlaceHolder = await headerLeftPane.$("shadow/.together-form-prompt");
					const placeHolderText = await page.evaluate(emailAddressPlaceHolder => emailAddressPlaceHolder.innerText, emailAddressPlaceHolder);
					
					
					if (String(placeHolderText).indexOf("Enter your email address") == -1) {
						messages.push("placeholder txt inside EmailAddress fields is not as per spec  on "+app_name+" Web Home Page");
					}

					const emailAddress = await headerLeftPane.$("shadow/input[type = text]");
					await emailAddress.click();
					await page.waitFor(3000);
					if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
						await emailAddress.type(abc+"@gmail.com");
					}else{
					    await emailAddress.type(abc+"@healthline.com");
					}
					console.log(abc);
				} catch (e) {
					console.log(e);
					messages.push("EmailAddress fields is missing in " + app_name);
				}
				

				try {
					await page.waitForSelector("shadow/.input-button", {
						visible: true,
					});
					const continueButton = await headerLeftPane.$("shadow/.input-button");
					await continueButton.click();
					await page.waitForNavigation();
					await page.waitFor(3000);
				} catch (e) {
					console.log(e);
					messages.push("Continue button is missing in " + app_name);
				}

				try { //Sign Up second screen

					
					await page.waitForSelector("app-registration:nth-child(2)", {
						visible: true,
					});
	 
					const headerLeftPane1 = await page.$("app-registration:nth-child(2)");  //locate app privacy pop-up
					
									
					try{
					
						const password = await headerLeftPane1.$("shadow/input[type = password]");
						await password.type('12345678');
						} catch (e) {
							console.log(e);
							messages.push("password field is missing in " + app_name);
						}
					try{
					const userName = await headerLeftPane1.$$("shadow/input[type = text]");
					await userName[1].click({ clickCount: 1 });
					await userName[1].type(abc);
				    } catch (e) {
					  console.log(e);
					  messages.push("Continue button is missing in " + app_name);
				    }

					try{
					    await page.waitForSelector("shadow/.together-dropdown-field", {
						      visible: true,
					    });


					   const locationValue = await headerLeftPane1.$("shadow/.together-dropdown-field");
					   await locationValue.click(); //click location drop down
                try{
					await page.waitForSelector("shadow/.single-select-menu-container", {
						visible: true,
					});

					const headerLeftPane2 = await page.$("shadow/.single-select-menu-container");
					const countryValue = await headerLeftPane2.$("shadow/.radio-item");
					await countryValue.click(); //click 1st country radio button
                try{
					const submitButton = await headerLeftPane2.$("shadow/.button-container");
					await submitButton.click(); //submit button on location popup
				} catch (e) {
					console.log(e);
					messages.push("Submit button is missing on location dropdown in " + app_name);
				}

				} catch (e) {
					console.log(e);
					messages.push("Location menu is not displaying on clicking location dropdown in " + app_name);
				}

				    } catch (e) {
					    console.log(e);
					    messages.push("Location dropdown is missing in " + app_name);
				    }

                try{
					const ageCheckbox = await headerLeftPane1.$("shadow/.checkbox-container");
					await ageCheckbox.click();
				} catch (e) {
					console.log(e);
					messages.push("Are you 18 or Older? checkbox is missing on Sign Up STEP - 2 Screen " + app_name);
				}

				try{
					const signupButton = await headerLeftPane1.$("shadow/.together-button");
					await signupButton.click();
					await page.waitForNavigation();
					//await page.waitFor(5000);
                    
					try{
						const posttogroup = await headerLeftPane1.$("shadow/together-feed-post-group-button");
					}catch(e){
						console.log(e);
						messages.push("Group to post component is missing after SIGNUP " + app_name);
					}


				} catch (e) {
					console.log(e);
					messages.push("Sign Up button is missing on Sign Up STEP - 2 Screen " + app_name);
				}


			} catch (e) {
				console.log(e);
				messages.push("Sign Up STEP-2 scrren is missing in " + app_name);
			}

		} catch (e) {
			console.log(e);
			messages.push("Sign Up STEP-1 scrren is missing in " + app_name);
		}

		} catch (e) {
			console.log(e);
			messages.push("SignUp link is missing in " + app_name);
		}

		errormsg = "";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});

		// Assertion for error message
		expect(errormsg).to.equal('')

		await page.waitFor(5000);
	});

	it('*** Logout flow ', async () => {
		var messages = []; // Declared messages array to hold the errors
		//open home page

		try {

			await page.waitForSelector("shadow/.registered-options", {
				visible: true,
			});

			const logoutLink = await page.$("shadow/.logout-link .together-highlight-text");
			const txtLogout = await page.evaluate(logoutLink => logoutLink.innerText, logoutLink);
			console.log("error message -->" + txtLogout);
			if ((String(txtLogout).indexOf("Log out") == -1)) {
				messages.push("After Sign Up Log out link is not displaying.");
			}
			await logoutLink.click();
			await page.waitForNavigation();
			//await page.waitFor(25000);
			await page.waitForSelector(".desktop .logo-holder", {
				visible: true,
			});
			const logo = await page.$(".desktop .logo-holder");
			await logo.click();
			await page.waitForNavigation();
			//await page.waitFor(25000);


		} catch (e) {
			console.log(e);
			messages.push("Logout link is missing " + app_name);
		}
		errormsg = "";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});

		expect(errormsg).to.equal('')
	});



	it('*** Email Sign In flow ', async () => {
		var messages = []; // Declared messages array to hold the errors
		//open home page
try {
	await page.waitForSelector("div.desktop .right-pane", {
		visible: true,
	  });
	const container = await page.$("div.desktop .right-pane");

	
	//located log in Link
	const login = await container.$(".join-signin .together-highlight-text");
	await login.click(); // Clicked Sign Up button
	await page.waitFor(5000);
} catch (e) {
	console.log(e);
	// Error will be catch here if element for 'Home' link is not located, then adding error message to messages
	messages.push("Problem locating Login link");
}

		try {

			
			const signinContainer = await page.$("shadow/app-signin");
			try {

				const emailAddress = await signinContainer.$("input[type = name]");
				await emailAddress.click({ clickCount: 3 });
				await emailAddress.press('Backspace');
				//await emailAddress.type(abc+"@healthline.com");
				if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
					await emailAddress.type(abc+"@gmail.com");
				}else{
					await emailAddress.type(abc+"@healthline.com");
				}

			} catch (e) {
				console.log(e);
				messages.push("EmailAddress field is missing " + app_name);
			}

			try {
				const password = await page.$$("input");
				await password[1].click({ clickCount: 3 });
				await password[1].press('Backspace');
				await password[1].type('12345678');

			} catch (e) {
				console.log(e);
				messages.push("Password is missing " + app_name);
			}

			const eyeIcon = await signinContainer.$("div.right-icon");
			await eyeIcon.click();

			try {
				const login = await signinContainer.$("together-button");
				await login.click();
			} catch (e) {
				console.log(e);
				messages.push("Login button is missing " + app_name);
			}


		} catch (e) {
			console.log(e);
			messages.push("SignIn container is missing " + app_name);
		}
		errormsg = "";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});

		expect(errormsg).to.equal('')
	});


	it('*** Delete account flow', async () => {
		var messages = []; // Declared messages array to hold the errors

    try {
	await page.waitForSelector("shadow/div.registered-options", {
		visible: true,
	});
	const deleteContainer = await page.$("shadow/div.registered-options");  //locate right pane from the header
	
	const deleteLink = await deleteContainer.$("shadow/.delete-link .together-highlight-text");
	const txtDelete = await page.evaluate(deleteLink => deleteLink.innerText, deleteLink);
	console.log("Delete message -->" + txtDelete);
	if ((String(txtDelete).indexOf("Delete Account") == -1)) {
		messages.push("Delete account button in popup is not displaying.");
	}
	await deleteLink.click();
	await page.waitFor(3000);
    //confirmation Popup
	try{
		const deleteBtns = await page.$("shadow/.confirmation-footer");  //locate right pane from the header
	
		const deleteBtn = await deleteBtns.$$("shadow/div");
	
		await deleteBtn[1].click();
        await page.waitFor(9000);
		try {
			await page.waitForSelector("div.desktop .right-pane", {
				visible: true,
			  });
			const container = await page.$("div.desktop .right-pane");
			//located log in Link
			const login = await container.$(".join-signin .together-highlight-text");
			
		} catch (e) {
			console.log(e);
			// Error will be catch here if element for 'Home' link is not located, then adding error message to messages
			messages.push("SignUp button and login link not displaying in header after user delete account");
		}


	} catch (e) {
		console.log(e);
	messages.push("Delete Button is missing inside a confirmation popup after clicking Delete Account link" + app_name);
}
}catch (e) {
		console.log(e);
	messages.push("Delete link is missing in LHS Navigation" + app_name);
}

		errormsg = "";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});

		expect(errormsg).to.equal('')
	});


	xit('*** Google Sign In flow ', async () => {
		var messages = []; // Declared messages array to hold the errors
		await page.goto(URL, {
			waitUntil: 'networkidle2',
			// Remove the timeout\y
			timeout: 0
		});

		//checking cookie to make sure that user is already logged in
		//var cookies = await page.cookies();


		// Waited for app-prvary tag to load
		await page.waitForSelector("shadow/div.desktop .right-pane", {
			visible: true,
		});
		const headerRightPane = await page.$("shadow/div.desktop .right-pane");  //locate right pane from the header

		//located login link from the header
		try {
			const loginLink = await headerRightPane.$("shadow/ion-router-link");
			await loginLink.click();  // Clicked Login link
		} catch (e) {
			messages.push("Login link is missing on Sign In page in " + app_name);
		}
		
		try {

			await page.waitForSelector("shadow/app-registration", {
				visible: true,
			});
			const signinContainer = await page.$("shadow/app-registration");
			try {
				await page.waitForSelector("shadow/.google", {
					visible: true,
				});
				const googleButton = await signinContainer.$("shadow/.google");

				await googleButton.click();




				// To deal with new tab opened by clicking link that opening the webpage in new tab 
				const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
				let page2 = await newPagePromise; // Define New Browser tab

				//const heading = await page2.$("#headingText");
				await page.waitFor(5000);
				if (String(page2.url()).indexOf("https://accounts.google.com/o/oauth2/auth/identifier?redirect_uri=storagerelay") == -1) {
					messages.push("Google Login Popup not open on clicking Continue with Google button");
				}
				await page.waitFor(3000);
 
               		await page2.waitForSelector("input[type = email]", {
						visible: true,
					});
					
					const gemailAddress = await page2.$("input[type = email]");
					await gemailAddress.type("prodigyinfosoft.p.ltd@gmail.com");
					await page.waitFor(5000);
					await page2.waitForSelector("button", {
						visible: true,
					});
					
					const gbtn1 = await page2.$("button");
					gbtn1.click();
					await page.waitFor(5000);
					

					await page2.waitForSelector("input[type = password]", {
						visible: true,
					});
					
					const gpassword = await page2.$("input[type = password]");
					await gpassword.type("XYZ886699@");
					
					await page2.waitForSelector("button", {
						visible: true,
					});
					
					const gbtn2 = await page2.$("button");
					gbtn2.click();



			} catch (e) {
				console.log(e);
				messages.push("Google button is missing on Sign In page in " + app_name);
			}

		} catch (e) {
			//s
			console.log(e);
			messages.push("SignIn container is missing " + app_name);
		}


		errormsg = "";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});

		// Assertion for error message
		expect(errormsg).to.equal('')

		//await page.waitFor(5000);
	});



	xit('*** Apple Sign In flow ', async () => {
		var messages = []; // Declared messages array to hold the errors
		await page.goto(URL, {
			waitUntil: 'networkidle2',
			// Remove the timeout
			timeout: 0
		});

		try {
			// Waited for app-prvary tag to load
			await page.waitForSelector("shadow/div.desktop.right-pane", {
				visible: true,
			});
			const headerRightPane = await page.$("shadow/div.desktop.right-pane");  //locate right pane from the header

			//located login link from the header
			try {
				const loginLink = await headerRightPane.$("shadow/ion-router-link");
				await loginLink.click();  // Clicked Login link
			} catch (e) {
				messages.push("Login link is missing on Sign In page in " + app_name);
			}

			await page.waitForSelector("shadow/div.together-signin-container", {
				visible: true,
			});
			const signinContainer = await page.$("shadow/div.together-signin-container");
			try {
				await page.waitForSelector("shadow/.apple", {
					visible: true,
				});
				const googleButton = await signinContainer.$("shadow/.apple");

				await googleButton.click();
				// To deal with new tab opened by clicking link that opening the webpage in new tab 
				const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
				const page2 = await newPagePromise; // Define New Browser tab
				if (String(page2.url()).indexOf("https://appleid.apple.com/auth/authorize?client_id=com.healthline.msbuddy-stage.applesignin&redirect_uri=") == -1) {
					messages.push("Apple Login Popup not open on clicking Continue with Apple button");
				}
			} catch (e) {
				console.log(e);
				messages.push("Apple button is missing on Sign In page in " + app_name);
			}

		} catch (e) {
			//s
			console.log(e);
			messages.push("SignIn container is missing " + app_name);
		}


		errormsg = "";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});

		// Assertion for error message
		expect(errormsg).to.equal('')

		//await page.waitFor(5000);
	});
});