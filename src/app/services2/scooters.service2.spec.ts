import {TestBed} from '@angular/core/testing';
import {ScootersService2} from './scooters.service2';


describe('ScootersService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });
  it('should be created', () => {
    const service: ScootersService2 = TestBed.get(ScootersService2)
    expect(service).toBeTruthy();
  });
});
