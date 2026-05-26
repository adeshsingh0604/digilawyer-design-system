import React from 'react';
import { Button } from './Button';

/* ── Shared icon — matches ico-plus from the design system SVG sprite ── */
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: 'text' },
  },
};

/* ── Playground — single interactive button with all controls ── */
export const Playground = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
    disabled: false,
    loading: false,
  },
};

/* ── All 5 variants ── */
export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

/* ── All 3 sizes — with icons to show proportional scaling ── */
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="sm" iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Small</Button>
      <Button variant="primary" size="md" iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Medium</Button>
      <Button variant="primary" size="lg" iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Large</Button>
    </div>
  ),
};

/* ── With icons — left, right, both, icon-only ── */
export const WithIcons = {
  name: 'With Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#5D5D5D', width: '90px', flexShrink: 0 }}>Left icon</span>
        <Button variant="primary"   iconLeft={<PlusIcon />}>Label</Button>
        <Button variant="secondary" iconLeft={<PlusIcon />}>Label</Button>
        <Button variant="tertiary"  iconLeft={<PlusIcon />}>Label</Button>
        <Button variant="ghost"     iconLeft={<PlusIcon />}>Label</Button>
        <Button variant="danger"    iconLeft={<PlusIcon />}>Label</Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#5D5D5D', width: '90px', flexShrink: 0 }}>Right icon</span>
        <Button variant="primary"   iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="secondary" iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="tertiary"  iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="ghost"     iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="danger"    iconRight={<ArrowIcon />}>Label</Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#5D5D5D', width: '90px', flexShrink: 0 }}>Both</span>
        <Button variant="primary"   iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="secondary" iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="tertiary"  iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="ghost"     iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="danger"    iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
      </div>

    </div>
  ),
};

/* ── Disabled — all variants ── */
export const Disabled = {
  name: 'Disabled',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="tertiary" disabled>Tertiary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="danger" disabled>Danger</Button>
    </div>
  ),
};

/* ── Loading — all variants ── */
export const Loading = {
  name: 'Loading',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" loading>Primary</Button>
      <Button variant="secondary" loading>Secondary</Button>
      <Button variant="tertiary" loading>Tertiary</Button>
      <Button variant="ghost" loading>Ghost</Button>
      <Button variant="danger" loading>Danger</Button>
    </div>
  ),
};
