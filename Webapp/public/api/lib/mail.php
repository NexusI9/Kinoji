
<?php

function sendmail($body)
{
    switch ($body['type']) {

        case 'SEND_MAIL':
            
            // Takes raw data from the request
            $content = $body['message'];
            $from = $body['email'];
            $name = $body['name'];
            $to = "kinoji@elkhantour.com";

            //clean Content 
            $content =  str_replace("\n.", "\n..", $content);
            $content =  wordwrap($content, 70, "\r\n");

            $subject = "Incoming message from: " . $name;

            $headers = "From:" . $name . " <" . $from . ">" . "\r\n";
            $headers .= "Reply-To:<" . $from . ">" . "\r\n";
            $headers .= "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-Transfer-Encoding: 8bit" . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            $headers .= "Date: " . date("r (T)") . "\r\n";
            $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";


            if ($content && $from && $name) {

                $mail =  mail($to, $subject, $content, $headers);

                if ($mail) {
                    echo "success";
                } else {
                    echo "error while sending mail";
                }
            } else {
                echo "error: missing data";
            }


            break;

            default:
    }
}
