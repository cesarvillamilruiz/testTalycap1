import { TestBed } from '@angular/core/testing';

import { AuthorBookService } from './author-book.service';

describe('AuthorBookService', () => {
  let service: AuthorBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
