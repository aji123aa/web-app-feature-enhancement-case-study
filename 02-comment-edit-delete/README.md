# Comment Edit and Delete Demo

## Overview

This feature demonstrates comment management functionality for a content-based web application. It allows users to edit or delete only the comments they created.

## Problem

Users may need to correct or remove their own comments after posting. At the same time, the system must prevent users from modifying comments created by others.

## Solution

The demo implements user-specific comment actions with frontend state handling and mock API behavior.

Users can:

- View a list of comments
- Edit their own comment
- Save or cancel the edit
- Delete their own comment after confirmation
- See protected comments from other users without edit/delete actions

## Key Features

- User ownership check
- Conditional rendering of edit/delete buttons
- Edit mode with textarea input
- Save and cancel actions
- Delete confirmation
- Loading/processing state
- Success/error message handling
- Mock update and delete API functions

## Tech Concepts Used

- React functional components
- React state management
- Conditional rendering
- CRUD operation flow
- User ownership validation
- Mock asynchronous API handling
- Basic UI state management

## Confidentiality Notice

This is a recreated and sanitized demo implementation based on internship learning.

It does not include company source code, proprietary product names, internal API details, private database schema, confidential workflows, screenshots, credentials, or business-sensitive information.