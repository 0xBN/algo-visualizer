import { render, screen, within } from '@testing-library/react';

import { describe, expect, it } from 'vitest';
import Grid from './Grid';

describe('Grid', () => {
  it('shows no grid initally', () => {
    render(<Grid />);
    const grid = screen.getByLabelText
  });
});
