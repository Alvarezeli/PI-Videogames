import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import VideogameCreate, {validate}  from './VideogameCreate.jsx';


describe('<VideogameCreate />', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<VideogameCreate />);
    });
    it('El form debe tener un label que diga: "Name:"', () => {
        const { container } = render(<VideogameCreate/>)
        const element = container.querySelectorAll('label')[0]
        expect(element.innerHTML).toBe('Name:');
    });
  
    it('El form debe tener un label que diga: "Description:"', () => {
      const { container } = render(<VideogameCreate/>)
      const element = container.querySelectorAll('label')[1]
      expect(element.innerHTML).toBe('Description:');
    });
  
    it('El form debe tener un input con name "rating" y type "number"', () => {
      const { container } = render(<VideogameCreate/>)
      const element = container.querySelectorAll('input')[0]
      expect(element.type).toBe('number');
      expect(element.name).toBe('rating');
    });
  
    it('El form debe tener un input con name "released" y type "text"', () => {
      const { container } = render(<VideogameCreate/>)
      const element = container.querySelectorAll('input')[1]
      expect(element.type).toBe('text');
      expect(element.name).toBe('released');
    }); 
});