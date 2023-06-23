import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BookTicketComponent } from './book-ticket.component';
import { MovieService } from '../movie-service.service';
import { bookmovie } from '../model/bookmovie';

describe('BookTicketComponent', () => {
  let component: BookTicketComponent;
  let fixture: ComponentFixture<BookTicketComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockMovieService = jasmine.createSpyObj('MovieService', ['getMovieData']);
    mockActivatedRoute = { snapshot: { data: {} } };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], // Add FormsModule here
      declarations: [BookTicketComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MovieService, useValue: mockMovieService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookTicketComponent);
    component = fixture.componentInstance;
  });

  it('should initialize the component correctly', () => {
    const movie: bookmovie = new bookmovie(1, 'Movie 1', 50);
    mockMovieService.getMovieData.and.returnValue(movie);

    fixture.detectChanges();

    expect(component.movie).toEqual(movie);
    expect(component.seatsArray.length).toBe(50); // Adjust the expected length based on your logic
  });

  // Rest of the test cases...
});