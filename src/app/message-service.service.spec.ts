import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie-service.service';

import { MessageServiceService } from './message-service.service';

describe('MessageServiceService', () => {
  let service: MessageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the message', () => {
    const testMessage = 'Test message';

    // Set the message
    service.setMessage(testMessage);

    // Get the message
    service.getMessage().subscribe((message: string) => {
      expect(message).toBe(testMessage);
    });
  });

  // Add more test cases as needed

});