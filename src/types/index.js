// src/types/index.js

// User roles
export const USER_ROLES = {
  STAFF: 'staff',
  MANAGER: 'manager',
  ADMIN: 'admin'
};

// User profile structure matching backend
export const createUserProfile = (data = {}) => ({
  employee_id: data.employee_id || '',
  username: data.username || '',
  email: data.email || '',
  phone: data.phone || '',
  whatsapp: data.whatsapp || '',
  dob: data.dob || '',
  role: data.role || USER_ROLES.STAFF
});

// Staff assignment structure matching backend
export const createStaffAssignment = (data = {}) => ({
  id: data.id || null,
  employee_id: data.employee_id || '',
  shelf_id: data.shelf_id || '',
  assigned_by: data.assigned_by || '',
  is_active: data.is_active || false,
  assigned_at: data.assigned_at || ''
});

// Assignment history structure matching backend
export const createAssignmentHistory = (data = {}) => ({
  id: data.id || null,
  employee_id: data.employee_id || '',
  shelf_id: data.shelf_id || '',
  action: data.action || '',
  action_date: data.action_date || '',
  performed_by: data.performed_by || '',
  notes: data.notes || ''
});

// API response structure
export const createApiResponse = (data = {}, error = null) => ({
  data: data,
  error: error,
  loading: false
});

// Login form data
export const createLoginData = (data = {}) => ({
  username: data.username || '',
  password: data.password || '',
  role: data.role || USER_ROLES.STAFF
});

// Common shelf structure
export const createShelf = (data = {}) => ({
  id: data.id || '',
  name: data.name || '',
  description: data.description || '',
  location: data.location || ''
});