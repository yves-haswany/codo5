import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApiAndContentfulComponent from './APIDataComponent';
import { fetchApiData } from './apiService';
import { createClient } from 'contentful';

jest.mock('./apiService');
jest.mock('contentful', () => ({
  createClient: jest.fn(() => ({
    getEntries: jest.fn(),
  })),
}));

describe('ApiAndContentfulComponent', () => {
  beforeEach(() => {
    fetchApiData.mockResolvedValue({ data: 'test data' });
    createClient().getEntries.mockResolvedValue({
      items: [{ sys: { id: '1' }, fields: { title: 'Test Title', body: 'Test Body' } }],
    });
  });

  it('should fetch and display API and Contentful data', async () => {
    render(<ApiAndContentfulComponent />);

    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for data to be loaded
    await waitFor(() => expect(screen.getByText('API Data')).toBeInTheDocument());

    // Check API data
    expect(screen.getByText('test data')).toBeInTheDocument();

    // Check Contentful data
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });
});
