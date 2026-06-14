package com.app.controller;

import com.app.dto.request.ForgotPasswordRequest;
import com.app.dto.request.LoginRequest;
import com.app.dto.request.RefreshTokenRequest;
import com.app.dto.request.ResetPasswordRequest;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.JwtAuthenticationResponse;
import com.app.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * AuthController — Phase 5B
 *
 * <p>Exposes all authentication-related endpoints under {@code /api/auth}.
 * This controller is intentionally thin: it validates incoming requests,
 * delegates all business logic to {@link AuthService}, and wraps results
 * in a uniform {@link ApiResponse} envelope before returning them to the
 * caller.
 *
 * <p>Exception propagation: no try-catch blocks are used here. Any runtime
 * or application-specific exceptions bubble up to the Global Exception
 * Handler (Phase 6) which converts them into standardised error responses.
 */
@Tag(
    name        = "Authentication",
    description = "Endpoints for user login, token refresh, and password management"
)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // ------------------------------------------------------------------ //
    //  Dependencies                                                        //
    // ------------------------------------------------------------------ //

    private final AuthService authService;

    /**
     * Constructor injection — the only form of DI used in this controller.
     *
     * @param authService core authentication service
     */
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ------------------------------------------------------------------ //
    //  POST /api/auth/login                                                //
    // ------------------------------------------------------------------ //

    /**
     * Authenticates a user with their email/username and password.
     *
     * <p>Flow:
     * <ol>
     *   <li>Bean Validation validates {@link LoginRequest} fields.</li>
     *   <li>{@link AuthService#login(LoginRequest)} verifies credentials,
     *       generates an access token, and issues a refresh token.</li>
     *   <li>Returns {@link JwtAuthenticationResponse} containing both tokens
     *       and basic user information.</li>
     * </ol>
     *
     * @param request validated login credentials
     * @return 200 OK with JWT access + refresh tokens
     */
    @Operation(
        summary     = "User login",
        description = "Authenticate with email/username and password. Returns a JWT access token and a refresh token."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description  = "Authentication successful",
            content      = @Content(schema = @Schema(implementation = JwtAuthenticationResponse.class))
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description  = "Validation failure — missing or malformed fields"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description  = "Invalid credentials"
        )
    })
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtAuthenticationResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        JwtAuthenticationResponse tokenResponse = authService.login(request);

        return ResponseEntity.ok(
            ApiResponse.success("Login successful", tokenResponse)
        );
    }

    // ------------------------------------------------------------------ //
    //  POST /api/auth/refresh                                              //
    // ------------------------------------------------------------------ //

    /**
     * Issues a new access token (and optionally a new refresh token) using
     * a valid, non-expired refresh token.
     *
     * <p>Flow:
     * <ol>
     *   <li>Bean Validation ensures the {@code refreshToken} field is present.</li>
     *   <li>{@link AuthService#refreshToken(RefreshTokenRequest)} validates the
     *       refresh token's signature, expiry, and revocation status.</li>
     *   <li>Returns a fresh {@link JwtAuthenticationResponse}.</li>
     * </ol>
     *
     * @param request wrapper containing the refresh token string
     * @return 200 OK with new JWT access token (and refresh token if rotated)
     */
    @Operation(
        summary     = "Refresh access token",
        description = "Exchange a valid refresh token for a new JWT access token."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description  = "Token refreshed successfully",
            content      = @Content(schema = @Schema(implementation = JwtAuthenticationResponse.class))
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description  = "Refresh token missing or malformed"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description  = "Refresh token expired or revoked"
        )
    })
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<JwtAuthenticationResponse>> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request) {

        JwtAuthenticationResponse tokenResponse = authService.refreshToken(request);

        return ResponseEntity.ok(
            ApiResponse.success("Token refreshed successfully", tokenResponse)
        );
    }

    // ------------------------------------------------------------------ //
    //  POST /api/auth/forgot-password                                      //
    // ------------------------------------------------------------------ //

    /**
     * Initiates the password-reset flow for the given email address.
     *
     * <p>Flow:
     * <ol>
     *   <li>Bean Validation ensures {@code email} is syntactically valid.</li>
     *   <li>{@link AuthService#forgotPassword(ForgotPasswordRequest)} locates
     *       the account (if it exists), generates a time-limited reset token,
     *       and dispatches a reset-link email.</li>
     *   <li>Returns a <strong>generic</strong> success message regardless of
     *       whether the email address is registered — this prevents
     *       user-enumeration attacks.</li>
     * </ol>
     *
     * @param request wrapper containing the requester's email address
     * @return 200 OK with a generic acknowledgement message
     */
    @Operation(
        summary     = "Forgot password",
        description = "Trigger a password-reset email. Always returns success to prevent user enumeration."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description  = "Request acknowledged — reset link sent if the account exists"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description  = "Validation failure — invalid email format"
        )
    })
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        // Delegate to service; the service handles email existence silently.
        authService.forgotPassword(request);

        // Generic message: intentionally does NOT confirm whether the account exists.
        return ResponseEntity.ok(
            ApiResponse.success(
                "If an account with that email exists, a password reset link has been sent.", null)
        );
    }

    // ------------------------------------------------------------------ //
    //  POST /api/auth/reset-password                                       //
    // ------------------------------------------------------------------ //

    /**
     * Completes the password-reset flow by consuming the one-time reset token
     * and applying the new password.
     *
     * <p>Flow:
     * <ol>
     *   <li>Bean Validation checks that both {@code token} and {@code newPassword}
     *       fields meet their constraints.</li>
     *   <li>{@link AuthService#resetPassword(ResetPasswordRequest)} verifies the
     *       token's validity and expiry, hashes the new password, persists it,
     *       and invalidates the one-time token.</li>
     *   <li>Returns a generic success response. Sensitive details (e.g. username)
     *       are not echoed back.</li>
     * </ol>
     *
     * @param request contains the reset token and the desired new password
     * @return 200 OK with a generic success message
     */
    @Operation(
        summary     = "Reset password",
        description = "Consume a password-reset token and set a new password."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description  = "Password reset successfully"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description  = "Validation failure or token malformed"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description  = "Reset token expired or already used"
        )
    })
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        authService.resetPassword(request);

        return ResponseEntity.ok(
            ApiResponse.success("Password has been reset successfully. Please log in with your new password.", null)
        );
    }
}
