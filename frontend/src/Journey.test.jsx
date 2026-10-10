import React from 'react';
import {cleanup,render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {afterEach,beforeEach,expect,test,vi} from 'vitest';
import App from './App.jsx';import Journey from './Journey.jsx';
vi.mock('./VehicleStage.jsx',()=>({default:()=> <canvas aria-label="BMW rotation viewer"/>}));
beforeEach(()=>{window.history.replaceState(null,'','/');vi.stubGlobal('scrollTo',vi.fn());vi.stubGlobal('matchMedia',vi.fn(()=>({matches:false,addEventListener:vi.fn(),removeEventListener:vi.fn()})));});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
test('all 24 entries filter by body family and retain selected variant in workspace',async()=>{
 render(<App/>);expect(screen.getAllByRole('button',{name:/^Explore BMW/})).toHaveLength(24);
 await userEvent.click(screen.getByRole('button',{name:'G60 10',exact:true}));expect(screen.getAllByRole('button',{name:/^Explore BMW/})).toHaveLength(10);
 await userEvent.click(screen.getByRole('button',{name:'Explore BMW i5 M60 xDrive',exact:true}));
 expect(screen.getByText('BMW i5 M60 xDrive')).toBeTruthy();expect(screen.getByAltText('BMW i5 M60 xDrive, front three-quarter view').getAttribute('src')).toBe('/images/bmw/g60.webp');expect(window.location.hash).toBe('#workspace');
 await userEvent.click(screen.getByRole('button',{name:/Back to the BMW journey/}));expect(screen.getByRole('heading',{name:/ONE LIFE/})).toBeTruthy();
});
test('reduced motion exposes all four families without a pinned or rotating scene',()=>{
 window.matchMedia.mockImplementation(()=>({matches:true,addEventListener:vi.fn(),removeEventListener:vi.fn()}));const {container}=render(<Journey onOpen={vi.fn()}/>);
 expect(container.querySelector('.j-scroll-track')).toBeNull();expect(container.querySelector('canvas')).toBeNull();expect(container.querySelectorAll('.j-static-chapter')).toHaveLength(4);expect(screen.getByRole('heading',{name:/MORE ROOM/})).toBeTruthy();
});
