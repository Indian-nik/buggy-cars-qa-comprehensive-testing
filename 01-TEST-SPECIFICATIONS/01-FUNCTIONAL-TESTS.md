# 🧪 FUNCTIONAL TESTING - BUGGY CARS RATING APPLICATION

## Test Execution Summary
- **Application URL:** https://buggy.justtestit.org/
- **Test Credentials:** Username: bing | Password: Pass@123
- **Total Functional Tests:** 15+
- **Categories:** Registration, Login, Profile Management, Catalog Browsing, Voting System

---

## 📋 FUNCTIONAL TEST CASES

### Category 1.1: Registration Module (12 Tests)

#### FT-REG-001: Register with Valid Credentials
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending

**Test Steps:**
1. Navigate to https://buggy.justtestit.org/register
2. Enter Login: testuser001
3. Enter First Name: John
4. Enter Last Name: Doe
5. Enter Password: Test@12345
6. Confirm Password: Test@12345
7. Click "Register" button

**Expected Result:**
- Registration successful
- Success message displayed
- Redirected to login page
- User can login with new credentials

---

#### FT-REG-002: Login Field Required Validation
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending

**Test Steps:**
1. Navigate to registration page
2. Leave Login field empty
3. Fill other fields correctly
4. Click Register

**Expected Result:**
- Error message: "Login is required"
- Form not submitted
- User stays on registration page

---

#### FT-REG-003: FirstName Field Required Validation
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending
**Expected Result:** Error message: "First Name is required"

---

#### FT-REG-004: LastName Field Required Validation
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending
**Expected Result:** Error message: "Last Name is required"

---

#### FT-REG-005: Password Field Required Validation
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending
**Expected Result:** Error message: "Password is required"

---

#### FT-REG-006: Password Confirmation Mismatch
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending

**Test Steps:**
1. Fill registration form
2. Password: Test@123
3. Confirm Password: Different@123
4. Click Register

**Expected Result:** Error: "Passwords do not match"

---

#### FT-REG-007: Duplicate Username Prevention
**Priority:** P1 | **Type:** Business Logic | **Status:** ⏳ Pending

**Test Steps:**
1. Register user with username: bing
2. Try registering another user with same username

**Expected Result:** Error: "Username already exists"

---

#### FT-REG-008: Cancel Registration Button
**Priority:** P2 | **Type:** Navigation | **Status:** ⏳ Pending
**Expected Result:** Navigate to login page, data not saved

---

#### FT-REG-009: Special Characters in FirstName
**Priority:** P3 | **Type:** Edge Case | **Status:** ⏳ Pending
**Payload:** "John@#$%"
**Expected Result:** Either accepted or validation error (consistent)

---

#### FT-REG-010: Very Long Input String (500+ chars)
**Priority:** P3 | **Type:** Edge Case | **Status:** ⏳ Pending
**Expected Result:** Either truncated or validation error

---

#### FT-REG-011: Whitespace Trimming
**Priority:** P2 | **Type:** Edge Case | **Status:** ⏳ Pending
**Payload:** Login: "  testuser123  "
**Expected Result:** Whitespace trimmed, registration succeeds

---

#### FT-REG-012: Alphanumeric Username
**Priority:** P2 | **Type:** Functional | **Status:** ⏳ Pending
**Payload:** Login: "user123456"
**Expected Result:** Registration successful

---

### Category 1.2: Login Module (10 Tests)

#### FT-LOGIN-001: Successful Login with Valid Credentials
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending

**Test Steps:**
1. Navigate to https://buggy.justtestit.org/
2. Enter Username: bing
3. Enter Password: Pass@123
4. Click "Login" button

**Expected Result:**
- Login successful
- Dashboard/Home page loaded
- User information displayed

---

#### FT-LOGIN-002: Empty Username Field
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending
**Expected Result:** Error: "Username is required"

---

#### FT-LOGIN-003: Empty Password Field
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending
**Expected Result:** Error: "Password is required"

---

#### FT-LOGIN-004: Both Fields Empty
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending
**Expected Result:** Error messages for both fields

---

#### FT-LOGIN-005: Invalid Password
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending
**Payload:** Username: bing | Password: WrongPassword123
**Expected Result:** Error: "Invalid credentials"

---

#### FT-LOGIN-006: Non-existent Username
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending
**Payload:** Username: nonexistentuser123
**Expected Result:** Error: "User not found" or "Invalid credentials"

---

#### FT-LOGIN-007: Case Sensitivity - Username
**Priority:** P2 | **Type:** Edge Case | **Status:** ⏳ Pending
**Payload:** Username: BING (uppercase)
**Expected Result:** Consistent behavior (succeeds or fails based on system design)

---

#### FT-LOGIN-008: Case Sensitivity - Password
**Priority:** P2 | **Type:** Edge Case | **Status:** ⏳ Pending
**Payload:** Username: bing | Password: pass@123 (lowercase p)
**Expected Result:** Login fails (passwords typically case-sensitive)

---

#### FT-LOGIN-009: Leading/Trailing Spaces
**Priority:** P2 | **Type:** Edge Case | **Status:** ⏳ Pending
**Payload:** Username: " bing " (with spaces)
**Expected Result:** Spaces trimmed, login succeeds

---

#### FT-LOGIN-010: Session Timeout After Inactivity
**Priority:** P2 | **Type:** Business Logic | **Status:** ⏳ Pending

**Test Steps:**
1. Login successfully
2. Don't perform any action for 15+ minutes
3. Try to access protected page

**Expected Result:**
- Session expired
- Redirected to login
- Error message about session timeout

---

### Category 1.3: Profile Management (8 Tests)

#### FT-PROF-001: View User Profile
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending
**Expected Result:** Profile page displays all user information correctly

---

#### FT-PROF-002: Update FirstName
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending

**Test Steps:**
1. Login
2. Navigate to profile
3. Change FirstName to "Johnny"
4. Click Save

**Expected Result:**
- FirstName updated
- Persists after refresh
- Database updated

---

#### FT-PROF-003: Update LastName
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending
**Expected Result:** LastName updated and persisted

---

#### FT-PROF-004: Change Password Successfully
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending

**Test Steps:**
1. Navigate to change password
2. Current Password: Pass@123
3. New Password: NewPass@12345
4. Confirm: NewPass@12345
5. Click Save

**Expected Result:**
- Password changed
- Can login with new password
- Old password no longer works

---

#### FT-PROF-005: Change Password - Wrong Current
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending
**Expected Result:** Error: "Current password incorrect"

---

#### FT-PROF-006: New Passwords Don't Match
**Priority:** P1 | **Type:** Validation | **Status:** ⏳ Pending
**Expected Result:** Error: "Passwords do not match"

---

#### FT-PROF-007: Data Persistence After Logout
**Priority:** P2 | **Type:** Business Logic | **Status:** ⏳ Pending

**Test Steps:**
1. Update profile data
2. Logout
3. Login again

**Expected Result:** Updated data persists

---

#### FT-PROF-008: SQL Injection in Profile Update
**Priority:** P1 | **Type:** Security | **Status:** ⏳ Pending
**Payload:** FirstName: ' OR '1'='1'--
**Expected Result:** Payload sanitized, update fails

---

### Category 1.4: Catalog/Browsing (7 Tests)

#### FT-CAT-001: View Popular Makes
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending
**Expected Result:** Home displays "Popular Make" with Lamborghini and vote count

---

#### FT-CAT-002: View Popular Models
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending
**Expected Result:** Home displays "Popular Model" with Lamborghini Diablo

---

#### FT-CAT-003: Click on a Make
**Priority:** P1 | **Type:** Navigation | **Status:** ⏳ Pending
**Expected Result:** Shows all Lamborghini models, URL changes to /make/[id]

---

#### FT-CAT-004: Click on Specific Model
**Priority:** P1 | **Type:** Navigation | **Status:** ⏳ Pending
**Expected Result:** Model details page loads with voting option

---

#### FT-CAT-005: View Overall Rating Page
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending
**Expected Result:** Lists all registered models with ratings

---

#### FT-CAT-006: Pagination Works
**Priority:** P2 | **Type:** Functional | **Status:** ⏳ Pending
**Expected Result:** Different models display on each page

---

#### FT-CAT-007: Car Images Load Successfully
**Priority:** P2 | **Type:** Functional | **Status:** ⏳ Pending
**Expected Result:** All car images display, no 404 errors

---

### Category 1.5: Voting System (6 Tests)

#### FT-VOTE-001: Vote While Logged In
**Priority:** P1 | **Type:** Functional | **Status:** ⏳ Pending

**Test Steps:**
1. Login
2. Navigate to model
3. Click Vote

**Expected Result:**
- Vote submitted
- Vote count incremented by 1
- Confirmation message

---

#### FT-VOTE-002: Vote While Not Logged In
**Priority:** P1 | **Type:** Access Control | **Status:** ⏳ Pending
**Expected Result:** Redirect to login or error message

---

#### FT-VOTE-003: Double Voting Prevention
**Priority:** P1 | **Type:** Business Logic | **Status:** ⏳ Pending

**Test Steps:**
1. Vote for Model A
2. Try to vote again

**Expected Result:** Either prevented or allowed (consistent behavior)

---

#### FT-VOTE-004: Vote Count Accuracy
**Priority:** P2 | **Type:** Data Integrity | **Status:** ⏳ Pending

**Test Steps:**
1. Note current vote count
2. Vote
3. Refresh page

**Expected Result:** Count incremented by exactly 1

---

#### FT-VOTE-005: Add Comment While Voting
**Priority:** P2 | **Type:** Functional | **Status:** ⏳ Pending
**Expected Result:** Comment saved and displayed

---

#### FT-VOTE-006: XSS in Voting Comment
**Priority:** P1 | **Type:** Security | **Status:** ⏳ Pending
**Payload:** <script>alert('XSS')</script>
**Expected Result:** Script not executed, displayed as text

---

## Test Execution Matrix

| Test ID | Test Name | Status | Bugs Found | Date Executed |
|---------|-----------|--------|-----------|---------------|
| FT-REG-001 | Register with Valid Credentials | ⏳ | - | - |
| FT-REG-002 | Login Field Required | ⏳ | - | - |
| FT-REG-003 | FirstName Field Required | ⏳ | - | - |
| ... | ... | ... | ... | ... |

---

## Notes
- All tests should be executed in order
- Credentials: bing / Pass@123
- Run tests in all supported browsers
- Document all findings in bug reports
- Update status as tests are executed
