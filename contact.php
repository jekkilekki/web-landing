<?php
/*
 * Title:
 * URL:
 * For:
 * Site:
 * Author:
 * Company:
 * Last Modified: 
 * Reference Link:
 */

// Main Variables used throughout the script
$domain = "http://" . $_SERVER["HTTP_HOST"]; // Root Doman - http://example.com
$siteName = "Practical English Writing";
$siteEmail = "jekkilekki@gmail.com";
$err = "";

// Check if the web form has been submitted
if ( isset ( $_POST[ "contactEmail" ] ) ) {

	/*
	 * Process the web form variables
	 * Strip out any malicious attempts at code injection, just to be safe.
	 * All that is stored is safe html entities of code that might be submitted.
	 */
	$contactName = htmlentities( substr( $_POST[ "contactName" ], 0, 100 ), ENT_QUOTES );
	$contactEmail = htmlentities( substr( $_POST[ "contactEmail" ], 0, 100 ), ENT_QUOTES );
	$messageContent = htmlentities( substr( $_POST[ "messageContent" ], 0, 10000), ENT_QUOTES );

	// Reason for contact = our $messageSubject
	$reason[1] = 'Order Request';
	$reason[2] = 'Error Report';
	$reason[3] = 'Mailing List';
	$reason[4] = 'Feedback';
	$messageSubject = $reason[ $_POST[ "messageSubject" ] ];

	/*
	 * Perform some logic on the form data
	 * If the form data has been entered incorrectly, return an Error Message
	 */

	// Check if the data entered for the Email is formatted like an Email
	if ( !eregi( '^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]{2,})+$', $contactEmail ) ) {
		$err .= "Please enter a valid email address.<br>";
	}

	// Check if all the form fields contain data before we submit it
	if ( $contactName == "" || $contactEmail == "" || $messageContent == "" ) {
		$err .= "Your Name, Email, and Message cannot be left blank.<br>";
	}

	// IF NO ERROR - START
	if ( $err == "" ) {

		// Prepare the Email elements to be sent
		$subject = $messageSubject;
		$message = 
		"<html>
			<head>
			<title>" . $siteName . ": Feedback</title>
			</head>
			<body>
			" . wordwrap( $messageContent, 100 ) . "
			</body>
		</html>";
	
		/*
		 * Send the email using PHP's mail function
		 * To make the email appear more legit (avoiding Spam), we add several key headers
		 * Add additional headers later to further customize the email if desired
		 */

		$to = $siteName . " Contact Form <" . $siteEmail . ">";

		// To send HTML mail, the Content-type header must be set
		$headers = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

		// Additional Headers
		$headers .= 'From: ' . $contactName . ' <' . $contactEmail . '>' . "\r\n";
		$headers .= 'Reply-To: ' . $contactName . ' <' . $contactEmail . '>' . "\r\n";
		$headers .= 'Return-Path: ' . $contactName . ' <' . $contactEmail . '>' . "\r\n";
		$headers .= 'Date: ' . date("r") . "\r\n";
		$headers .= 'X-Mailer: ' . $siteName . "\r\n";


		// Now, Mail it
		if ( mail( $to, $subject, $message, $headers ) ) {
			echo '<div>Thank you for your email to ' . $siteName . '. We will read your message and contact you if necessary.</div>';
		}
		else {
			$er .= "We weren't able to send your message. Please contact " . $siteEmail . ".<br>";
		}

	}
	// IF NO ERROR - END

}

// If web form has not been submitted, show a blank form
else {

	showContactForm();

}


/*
 * If there have been errors, return the error notification
 * To be nice, also send back any data that's already been filled out properly
 */

// If there are errors, and the contact email is OK
if ( $err != '' && isset( $_POST[ "contactEmail" ] ) ) {
	showContactForm( $contactName, $contactEmail, $messageContent, $err );
}

// If there are errors, but no contact email
else if ( $err != '' && !isset( $_POST[ "contactEmail" ] ) ) {
	showContactForm( '', '', '', $err );
}


// Setup a function to display the contact form
function showContactForm( $contactName = "", $contactEmail = "", $messageContent = "", $err = "" ) {
	echo '<div class="contact-error">' . $err . '</div>
	<form action="' . $_SERVER[ "REQUEST_URI" ] . '" method="post" name="contactForm">
        <label>Name
          <input type="text" placeholder="Name">
        </label>
        <label>Email
          <input type="email" placeholder="Email">
        </label>
        <label>Optional Message
          <textarea placeholder="Have something to share? Let us hear it!"></textarea>
        </label>
        <br>
        <a class="button large expanded">Join Mailing List</a>
    </form>';
}

?>










