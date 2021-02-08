import { newE2EPage } from '@stencil/core/testing';

describe('checking on click button functionality', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-first-component></my-first-component>');

    const element = await page.find('.jumbotron button');
	
    expect(element).toHaveClass('btn-primary');
	await element.click();
	await page.waitForChanges();
	const entryBoxes=await page.findAll('.card');
	var i;
	for(i=0;i<entryBoxes.length;i++){
		const title=await entryBoxes[i].find('h4');
		expect(title).toHaveClass('card-title');
		var ttext="";
		if(i==0){
			ttext=title.textContent;
			console.log(ttext);
			expect(ttext).toContain('Udemy');
		}
		if(i==1){
			ttext=title.textContent;
			console.log(ttext);
			expect(ttext).toContain('Treehouse');
		}
		if(i==2){
			ttext=title.textContent;
			console.log(ttext);
			expect(ttext).toContain('Coursera');
		}	
        if(i==3){
			ttext=title.textContent;
			console.log(ttext);
			expect(ttext).toContain('Pluralsight');
		}				
	}
  });

});
