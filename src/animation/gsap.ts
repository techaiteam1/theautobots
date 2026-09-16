import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create('settle', '0.22,1,0.36,1');
gsap.registerEase('softStep', p => p * p * (3 - 2 * p));
export { gsap, ScrollTrigger };
